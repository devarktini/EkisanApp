import { auth, database, storage } from "../../firebase.config";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import {
  ref,
  set,
  get,
  onValue,
  ref as databaseRef,
  push,
  remove,
  serverTimestamp,
  update,
} from "firebase/database";
import { incGST } from "../utils/calc/gst";
import ImageResizer from "react-native-image-resizer";
import sendNotifiation, {
  sendNotification,
} from "./notification/sendNotifiation";
import Toast from "react-native-toast-message";
import { useDerivedValue } from "react-native-reanimated";


const fetchCategories = ({
  sortType = "newest",
  limit = null,
  productList = null,
  user = undefined,
}) => {
  const itemsRef = ref(database, "categories/");

  return new Promise((resolve) => {
    onValue(itemsRef, (snapshot) => {
      const snapVal = snapshot.val();
      var rawItemsList = [];
      for (const id in snapVal) {
        rawItemsList.push({ ...snapVal[id], id });
      }
      if (user) {
        if (user.userType == "farmer")
          rawItemsList = [
            "Farm Machinery - कृषि मशीनरी",
            "Fertilizers & Pesticides - उर्वरक & कीटनाशक",
            "Irrigation Equipment - सिंचाई उपकरण",
            "Animal Husbandry - पशुपालन",
          ];
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
};

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
};

const fetchProducts = ({
  sortType = "newest",
  limit = null,
  search = null,
}) => {
  const itemsRef = ref(database, "items/");

  return new Promise((resolve, reject) => {
    onValue(
      itemsRef,
      (snapshot) => {
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
            price: currentItem.price,
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

            return (
              name.includes(searchQuery) ||
              seller.includes(searchQuery) ||
              category.includes(searchQuery)
            );
          });
        }

        if (sortType === "newest") {
          filteredItems.sort((a, b) => b.timeStamp - a.timeStamp);
        }

        if (limit) {
          filteredItems = filteredItems.slice(0, limit);
        }

        resolve(filteredItems);
      },
      (error) => {
        reject(error); // Handle errors
      }
    );
  });
};

const fetchProductDatabyId = (id) => {
  return new Promise(async (resolve) => {
    const itemsRef = ref(database, `items/${id}`);
    onValue(itemsRef, (snapShot) => {
      const snapVal = snapShot.val();
      if (snapVal) {
        resolve({
          ...snapVal,
          price: incGST(snapVal),
          id: id,
        });
      } else {
        resolve(undefined);
      }
    });
  });
};



const uploadImage = async ({ user, itemData, productImage, productImages }) => {
  console.log("dddddddddddddd");
  const productImageURLs = [];

  if (productImages && productImages.length > 0) {
    for (const image of productImages) {
      const imageName = image.split("/").pop(); // Extract the image name from the URI
      console.log("Image Name:", imageName);
      // const compressedImage = await compressImage(image);
      const imageRef = storageRef(
        storage,
        `products/${user.uid}/${Date.now()}-${imageName}`
      );
      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      productImageURLs.push({
        url: imageUrl,
        path: imageRef.fullPath,
      });
    }
    console.log("product Image", productImageURLs);
  }
};
const sendItemToVerification = async ({
  user,
  itemData,
  productImage,
  productImages,
}) => {
  try {
    if (!user || !user.uid) {
      throw new Error("User is not authenticated");
    }

    const sellerName =
      user.userType === "corporate"
        ? user.corporateData.name || user.corporateData.fullName
        : user.name || user.fullName;
    const name =
      itemData.name === "custom" ? itemData.custom_name : itemData.name;

    const productImageURLs = [];

    if (productImages && productImages.length > 0) {
      for (const image of productImages) {
        console.log(image.name);
        const imageName = image.split("/").pop(); // Extract the image name from the URI
        // const compressedImage = await compressImage(image);
        const imageRef = storageRef(
          storage,
          `products/${user.uid}/${Date.now()}-${imageName}`
        );
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        const imageUrl = await getDownloadURL(imageRef);

        productImageURLs.push({
          url: imageUrl,
          path: imageRef.fullPath,
        });
      }
    }

    let certificateNo = Number(itemData.certificateNo);
    if (isNaN(certificateNo)) {
      certificateNo = null; // You can change this to 0 or "" if needed
    }
    // let mainImageUrl = null;
    // let mainImagePath = null;
    // if (productImage) {
    //     const compressedImage = await compressImage(productImage);
    //     const imageRef = storageRef(storage, `products/${user.uid}/${Date.now()}-${productImage.name}`);
    //     await uploadBytes(imageRef, compressedImage);
    //     mainImageUrl = await getDownloadURL(imageRef);
    //     mainImagePath = imageRef.fullPath;
    // }

    const verificationRef = databaseRef(database, "item-to-verify");

    const completeItemData = {
      ...itemData,
      name,
      imgUrl: productImageURLs[0]?.url,
      imagePath: productImageURLs[0]?.path,
      productImages: productImageURLs,
      sellerUID: user.uid,
      timeStamp: serverTimestamp(),
      block: user.block || null,
      district: user.district,
      state: user.state,
      sellerName: sellerName,
      userType: user.userType,
      custom_name: null,
      certificateNo: certificateNo,
    };

    const newItemRef = await push(verificationRef, completeItemData);

    // Send notification
    await sendNotifiation({
      title: "New Product Added",
      message: `${name} has been added for verification`,
      type: "product",
      userId: user.uid,
    });

    return {
      success: true,
      productId: newItemRef.key,
      imageUrl: productImageURLs[0]?.url,
      productImages: productImageURLs,
    };
  } catch (error) {
    console.error("Error in sendItemToVerification:", error);
    throw new Error("Failed to save product and images: " + error.message);
  }
};

 const deleteItemById = async (user, itemId) => {
    try {
        if (!user || !user.uid) {
            throw new Error("User is not authenticated");
        }
        if (!itemId) {
            throw new Error("Item ID is required to delete the item");
        }
        const itemRef = databaseRef(database, `item-to-verify/${itemId}`);

        await remove(itemRef);
        Toast.show({
            type: "success",
            text1: "Item deleted successfully!",
        });

        return {
            success: true,
            message: "Item deleted successfully",
        };
    } catch (error) {
         Toast.show({
                        type: 'error',
                        text1: 'failed to delete Item'
                    });

        console.error("Error in deleteItemById:", error);
        throw new Error("Failed to delete item: " + error.message);
    }
};

const fetchRejectedProducts = (uid) => {
    console.log("uid", uid)
    const itemsRef = ref(database, `/users/${uid}/item_rejected`);
    return new Promise(resolve => {
        onValue(itemsRef, (snapshot) => {
            const snapVal = snapshot.val();
            const rawItemsList = [];
            for (const id in snapVal) {
                const currentItem = snapVal[id];
                rawItemsList.push({ ...currentItem, id });
            }
            resolve(rawItemsList)
        });
    })

}

const fetchItemToVerify = (uid) => {
    const itemsRef = ref(database, 'item-to-verify');
    return new Promise(resolve => {
        onValue(itemsRef, (snapshot) => {
            const snapVal = snapshot.val();
            const rawItemsList = [];
            for (const id in snapVal) {
                const currentItem = snapVal[id];
                const newObj = {
                    ...currentItem,
                    price: incGST(currentItem),
                };
                if (currentItem.sellerUID === uid) { rawItemsList.push({ ...newObj, id }); }
            }
            resolve(rawItemsList)
        });
    })
}


export {
  fetchCategories,
  fetchProducts,
  fetchProductDatabyId,
  sendItemToVerification,
  uploadImage,
  deleteItemById,
  fetchRejectedProducts,
  fetchItemToVerify
};
