import { auth, database, storage } from '../../firebase.config'
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { ref, set, get, onValue, ref as databaseRef, push, remove, serverTimestamp, update } from "firebase/database";
import { incGST } from '../utils/calc/gst';
import ImageResizer from 'react-native-image-resizer';
import {sendNotification} from './notification/sendNotifiation';
// import { ref, onValue } from 'firebase/database';
// import { database } from '../../firebase.config';


const fetchCategories = ({ sortType = "newest", limit = null, productList = null, user = undefined }) => {
    const itemsRef = ref(database, 'categories/');

    return new Promise(resolve => {
        onValue(itemsRef, (snapshot) => {
            const snapVal = snapshot.val();
            var rawItemsList = [];
            for (const id in snapVal) {
                rawItemsList.push({ ...snapVal[id], id });
            }
            if (user) {
                if (user.userType == "farmer") rawItemsList = ["Farm Machinery - कृषि मशीनरी", "Fertilizers & Pesticides - उर्वरक & कीटनाशक", "Irrigation Equipment - सिंचाई उपकरण", "Animal Husbandry - पशुपालन"];
            }
            if (sortType == "newest" && limit == null && productList == null) {
                resolve(rawItemsList);
            }
            if (sortType == "productCount") {
                rawItemsList = sortCategoryByProductCount(productList, rawItemsList);
            }
            limit = limit ? limit : rawItemsList.length - 1;
            resolve(rawItemsList);
        });
    });
}

const sortCategoryByProductCount = (productList, categories) => {
    function QuantityTotaler(categoryName) {
        const filteredArray = productList.filter((x) => {
            return x.category === categoryName;
        });
        return filteredArray.length;
    }
    const sortedArr = [];
    categories.map((item) => {
        const productCount = QuantityTotaler(item.categorieName);
        if (productCount > 0) {
            sortedArr.push({ ...item, productCount });
        }
    });
    return sortedArr.sort((a, b) => b.productCount - a.productCount);
}

const fetchProducts = ({ sortType = "newest", limit = null, search = null }) => {
    const itemsRef = ref(database, 'items/');

    return new Promise((resolve, reject) => {
        onValue(itemsRef, (snapshot) => {
            const snapVal = snapshot.val();

            if (!snapVal) {
                resolve([]); // Resolve empty array if no data exists
                return;
            }

            const rawItemsList = [];
            for (const id in snapVal) {
                const currentItem = snapVal[id];
                const newObj = {
                    ...currentItem,
                    // price: incGST(currentItem),
                    price: currentItem.price
                };
                rawItemsList.push({ ...newObj, id });
            }
            let filteredItems = rawItemsList;
            if (search) {
                const searchQuery = search.toLowerCase();
                filteredItems = rawItemsList.filter((item) => {
                    const name = item.name ? item.name.toLowerCase() : "";
                    const seller = item.sellerName ? item.sellerName.toLowerCase() : "";
                    const category = item.category ? item.category.toLowerCase() : "";
                    
                    return name.includes(searchQuery) || seller.includes(searchQuery) || category.includes(searchQuery);
                });
            }

            if (sortType === "newest") {
                filteredItems.sort((a, b) => b.timeStamp - a.timeStamp);
            }

            if (limit) {
                filteredItems = filteredItems.slice(0, limit);
            }

            resolve(filteredItems);
        }, (error) => {
            reject(error); // Handle errors
        });
    });
}

const fetchProductDatabyId = (id) => {
    return new Promise(async (resolve) => {
        const itemsRef = ref(database, `items/${id}`);
        onValue(itemsRef, (snapShot => {
            const snapVal = snapShot.val();
            if (snapVal) {
                resolve(
                    {
                        ...snapVal,
                        price: incGST(snapVal),
                        id: id
                    }
                );
            }
            else {
                resolve(undefined)
            }
        }));
    });
};

const compressImage = async (imageUri) => {
    try {
        const resizedImage = await ImageResizer.createResizedImage(imageUri, 1024, 1024, "JPEG", 80);
        const response = await fetch(resizedImage.uri);
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error("Error compressing image:", error);
        throw error;
    }
};

 const sendItemToVerification = async ({ user, itemData, productImage, productImages }) => {
    try {
        if (!user || !user.uid) {
            throw new Error("User is not authenticated");
        }

        const sellerName = user.userType === "corporate" ? user.corporateData.name : user.name;
        const name = itemData.name === "custom" ? itemData.custom_name : itemData.name;

        const productImageURLs = [];

        if (productImages && productImages.length > 0) {
            for (const image of productImages) {
                const compressedImage = await compressImage(image.uri);
                const imageRef = storageRef(storage, `products/${user.uid}/${Date.now()}-${image.fileName || "image.jpg"}`);
                await uploadBytes(imageRef, compressedImage);
                const imageUrl = await getDownloadURL(imageRef);

                productImageURLs.push({
                    url: imageUrl,
                    path: imageRef.fullPath,
                });
            }
        }

        let mainImageUrl = null;
        let mainImagePath = null;
        if (productImage) {
            const compressedImage = await compressImage(productImage.uri);
            const imageRef = storageRef(storage, `products/${user.uid}/${Date.now()}-${productImage.fileName || "main.jpg"}`);
            await uploadBytes(imageRef, compressedImage);
            mainImageUrl = await getDownloadURL(imageRef);
            mainImagePath = imageRef.fullPath;
        }

        const verificationRef = databaseRef(database, "item-to-verify");

        const completeItemData = {
            ...itemData,
            name,
            imgUrl: mainImageUrl,
            imagePath: mainImagePath,
            productImages: productImageURLs,
            sellerUID: user.uid,
            timeStamp: serverTimestamp(),
            block: user.block || null,
            district: user.district,
            state: user.state,
            sellerName: sellerName,
            userType: user.userType,
            custom_name: null,
        };

        const newItemRef = await push(verificationRef, completeItemData);

        // Send notification
        await sendNotification({
            title: "New Product Added",
            message: `${name} has been added for verification`,
            type: "product",
            userId: user.uid,
        });

        return {
            success: true,
            productId: newItemRef.key,
            imageUrl: mainImageUrl,
            productImages: productImageURLs,
        };
    } catch (error) {
        console.error("Error in sendItemToVerification:", error);
        throw new Error("Failed to save product and images: " + error.message);
    }
};

export { fetchCategories, fetchProducts, fetchProductDatabyId, sendItemToVerification };