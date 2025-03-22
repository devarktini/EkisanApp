import { database } from '../../firebase.config';
import { get, push, ref, remove, set } from "firebase/database";
import { orderTrack } from "./TrackOrderService";
// import english from "@/util/name/english";

export const placeOrderInFirebase = async (cartItems, user) => {
  const TIMESTAMP = Date.now();
  const orderPromises = [];

  cartItems.forEach((item) => {
    const orderId = push(ref(database, "orders")).key;

    const OrderData = {
      item: { ...item, quantity: null, id: null },
      quantity: item.quantity,
      sellerId: item.sellerUID,
      buyerId: user.uid,
      timeStamp: TIMESTAMP,
      orderStatus: "placed",
    };

    orderPromises.push(
      Promise.all([
        set(ref(database, `orders/${orderId}`), OrderData),
        orderTrack(item, user, orderId),
        set(
          ref(
            database,
            `users/${item.sellerUID}/store/received_orders/${orderId}`
          ),
          {
            ...OrderData,
            buyerName: user.fullName,
            BuyerState: user.state,
            BuyerDistrict: user.district,
            street: user?.address?.address_line_1 || "",
            pincode: user?.address?.pincode || "",
            buyerMobile: user?.phoneNumber,
          }
        ),
        push(ref(database, `users/${item.sellerUID}/notifications`), {
          title: `You got an order`,
          description: "Check out the order detail. Click on view",
          timestamp: TIMESTAMP,
          type: "order",
          buttonText: "View",
          buttonUrl: "/store/orders",
        }),
        set(ref(database, `users/${user.uid}/orders/${orderId}`), OrderData),
        push(ref(database, `users/${user.uid}/notifications`), {
          title: `Your order is placed`,
          description: "Check out the order detail. Click on view",
          timestamp: TIMESTAMP,
          type: "order",
          buttonText: "View",
          buttonUrl: "/account/orders",
        }),
      ])
    );
  });

  await Promise.all(orderPromises);
  return { success: true, message: "Order placed successfully!" };
};

export const clearUserCart = async (userId) => {
  return remove(ref(database, `users/${userId}/cart`));
};


  export const getUserData = async (uid) => {
    try {
      const userRef = ref(database, `users/${uid}`);
      const userSnapshot = await get(userRef);
      return userSnapshot.exists() ? userSnapshot.val() : null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

export const fetchOrders = (user) => {
  console.log("userccc0", user)
    return new Promise(async (resolve) => {
        if (user?.orders) {
            // Handle if orderId is a key
            const orders = await Promise.all(
                Object.entries(user.orders).map(async ([orderId, order]) => {
                    console.log("orderId", orderId)
                    return {
                        orderId, // Add the key as orderId
                        ...order.item,
                        orderStatus: order.orderStatus,
                        quantity: order.quantity,
                        timeStamp: order.timeStamp,
                        itemId: order?.item?.id,
                    };
                })
            );
            console.log('orders', orders)
            resolve(orders);
        } else {
            console.warn("No orders found for user.");
            resolve([]);
        }
    });
};

export const fetchOrdersByUserId = async (userId) => {
  try {
    const userOrdersRef = ref(database, `users/${userId}/orders`);
    const snapshot = await get(userOrdersRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const orders = Object.entries(snapshot.val()).map(([orderId, order]) => ({
      orderId,
      ...order.item,
      orderStatus: order.orderStatus,
      quantity: order.quantity,
      timeStamp: order.timeStamp,
      itemId: order?.item?.id,
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
