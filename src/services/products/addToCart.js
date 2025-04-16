import { auth, database } from "@/firebase";
import { push, ref } from "firebase/database";
import Swal from "sweetalert2";
import fetchUser from "../user/fetchUser";


export const test = (arg) =>{
    alert("ram ram", arg)
}

const addToCart = async (user, item, setUser )=> {
    console.log("moved to cart !")
    if (user) {
        console.log('add item to cart', user)
        addItemToCart({ user, item, setUser })
    }
    else if (auth.currentUser) {
        console.log("auth.currentUser", auth.currentUser)
        addItemToCart({ user: await fetchUser({ user: auth.currentUser }), item, setUser })
    }
    else {
        showToast({ icon: "error", title: "You are not logged in" });
        return;
    }
};

const addItemToCart = async ({ user, item, setUser }) => {
    console.log("add item to cart function")
    //if seller is trying to buy his own items
    if (user.uid === item?.sellerUID) {
        console.log("condition user.uid === item.sellerUID",user.uid === item.sellerUID)
        showToast({ title: "You can't buy your own Products", icon: "error" });
        return;
    }
    if (!isUserRegistered(user)) {
        showToast({ icon: "error", title: "You are not Registerd" });
        return;
    }

    if (!isProductAvailable({ user, item })) {
        showToast({ icon: "info", title: "Sorry, this product is not available in your location" });
        return;
    }

    if (isDuplicate(user, item)) {
        showToast({ icon: "warning", title: "Product is already in the cart" });
    } else {
        const userCartRef = ref(database, `users/${user.uid}/cart`);
        const currentQuantity = item.userType === "farmer" ? 100 : 1;
        const newCartItemRef = await push(userCartRef, {
            itemId: item.id,
            quantity: currentQuantity
        })
        setUser ? setUser(await fetchUser({ user: auth.currentUser })) : location.replace("/cart")
        showToast({ icon: "success", title: "Product added to cart" });
    }
}
const isDuplicate = (user, item) => {
    const itemId = item.id;
    const userCartData = user.cart || [];
    const rawCartData = Object.values(userCartData).map((cartItem) => ({ id: cartItem.id, ...cartItem }));
    return rawCartData.some((cartItem) => cartItem.itemId === itemId);
};
const redirectToAuth = () => {
    location.replace("/auth");
};

const isUserRegistered = (user) => {
    if (!user?.name) {
        redirectToAuth();
        return false;
    }
    return true;
};

const isProductAvailable = ({ user, item }) => {
    const isCorporate = item.userType === "corporate";
    return isCorporate || user.state === item.state;
};

const showToast = ({ icon = "", title = "" }) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    Toast.fire({
        icon: icon,
        title: title,
    });
};
export default addToCart;
