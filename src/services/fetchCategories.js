import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase.config'

const fetchCategories = ({ sortType = "newest", limit = null, productList = null, user=undefined }) => {
    const itemsRef = ref(database, 'categories/');

    return new Promise(resolve => {
        onValue(itemsRef, (snapshot) => {
            const snapVal = snapshot.val();
            var rawItemsList = [];
            for (const id in snapVal) {
                rawItemsList.push({ ...snapVal[id], id });
            }
            if(user){
                if(user.userType=="farmer") rawItemsList = ["Farm Machinery - कृषि मशीनरी","Fertilizers & Pesticides - उर्वरक & कीटनाशक", "Irrigation Equipment - सिंचाई उपकरण", "Animal Husbandry - पशुपालन"]
            }
            if (sortType == "newest" && limit == null && productList == null) {
                resolve(rawItemsList)
            }
            if (sortType == "productCount") {
                rawItemsList = sortCategoryByProductCount(productList, rawItemsList)
            }
            limit = limit ? limit : rawItemsList.length - 1
            resolve(rawItemsList)
        });
    })
}

const sortCategoryByProductCount = (productList, categories) => {
    function QuantityTotaler(categoryName) {
        const filteredArray = productList.filter((x) => {
            return x.category === categoryName
        })


        return filteredArray.length

    }
    const sortedArr = [];
    categories.map((item) => {
        const productCount = QuantityTotaler(item.categorieName)
        if (productCount > 0) {
            sortedArr.push({ ...item, productCount })
        }
    })
    return sortedArr.sort((a, b) => b.productCount - a.productCount)
}

export default fetchCategories