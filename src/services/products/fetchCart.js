
// import { database } from "@/firebase"; 
// import { onValue, ref } from 'firebase/database';

import { fetchProductData } from "../productService";

const fetchCart = ({ user }) => {
    var total = 0
    return new Promise(
        async resolve => {
            if(user.cart){
                const userCartArr = await Promise.all(
                    user.cart &&
                    Object.values(user?.cart).map(async (cartItem, index) => {
                        var cartItemsArry = Object.keys(user?.cart)
                        const productDetail = await fetchProductData(cartItem.itemId);
                        total += parseFloat(cartItem.quantity) * parseFloat(productDetail.price);
                        const item = { ...productDetail, ...cartItem, cartId: cartItemsArry[index] };
                        return item;
                    })
                )
                resolve({ userCartArr, total })
            }
            else{
                resolve(null)
            }
        }
    );
}

export default fetchCart