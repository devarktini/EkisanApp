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

    return new Promise(async (resolve) => {
        if (user?.orders) {
            // Handle if orderId is a key
            const orders = await Promise.all(
                Object.entries(user.orders).map(async ([orderId, order]) => {
              
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

export const fetchReceivedOrders = async (user) => {
  const userId = user?.userId || user?.uid
try {
  if (!userId) {
    console.error("User ID is required to fetch received orders.");
    return [];
  }

  // Reference to the received_orders field in the user's store
  const ordersRef = ref(database, `users/${userId}/store/received_orders`);

  // Fetch data from Firebase
  const snapshot = await get(ordersRef);

  if (snapshot.exists()) {
    const ordersData = snapshot.val();

    // const ids = Object.keys(ordersData);
    // const receivedOrders = ids.map((id, index) => {
    //   const order = ordersData[id];
    //   return order
    // });

    const receivedOrders = Object.entries(ordersData).map(([id, order]) => ({
      id,
      ...order,
    }));

    return receivedOrders;
  } else {
    console.warn("No received orders found for user:", userId);
    return [];
  }
} catch (error) {
  console.error("Error fetching received orders:", error);
  throw error;
}
};

export const deleteOrder = async (user, orderId) => {
const userId = user?.userId || user?.uid;
try {
  if (!userId) {
    console.error("User ID is required to delete an order.");
    return false;
  }

  if (!orderId) {
    console.error("Order ID is required to delete an order.");
    return false;
  }
  const orderRef = ref(database, `users/${userId}/store/received_orders/${orderId}`);
  await remove(orderRef);

 
  return true;
} catch (error) {
  console.error("Error deleting the order:", error);
  throw error;
}
};
