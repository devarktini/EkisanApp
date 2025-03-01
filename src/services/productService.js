import { auth, database } from '../../firebase.config'
import { ref, set, get, onValue } from "firebase/database";
import { incGST } from '../utils/calc/gst';
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

export { fetchCategories, fetchProducts, fetchProductDatabyId };