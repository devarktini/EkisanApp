import { ref, push, get, query, orderByChild, equalTo, update} from 'firebase/database';
import { database } from "../../firebase.config";


export const orderTrack = async (itemData, user, orderId) => {
   
    if(!user){
        console.log("you are not register")
    }
    return new Promise(async (resolve, reject) => {
        const TIMESTAMP = Date.now();
        if(!user){
            console.log("you are not register")
        }
        try {
            const orderTrackRef = ref(database, "order-track");


            const request = {
                status: 'Available',
                isShipped: false,
                updatedAt: TIMESTAMP,
            };

            
            await push(orderTrackRef, {
                itemId:itemData?.id || 'null',
                buyerId: user?.uid || 'null',
                sellerId:itemData?.sellerUID || 'null',
                TIMESTAMP:TIMESTAMP,
                orderId,
                requests:[request]

            });

            resolve(true);
        } catch (error) {
          
            reject(error); 
        }
    });
};

export const updateRequestStatus = async (orderTrackId, newStatus) => {
    const requestRef = ref(database, `order-track/${orderTrackId}/requests/0`);
    
    try {
        await update(requestRef, {
            status: newStatus,
            updatedAt: Date.now(),
        });
       
    } catch (error) {
        console.error("Error updating request status:", error);
    }
};




export const getOrderTrackDetails = async (orderId) => {
 
    try {
        const orderTrackRef = ref(database, `order-track`);
        const snapshot = await get(orderTrackRef);

        if (snapshot.exists()) {
            const orderTracks = snapshot.val();
            for (let orderTrackId in orderTracks) {
                if (orderTracks[orderTrackId].orderId === orderId) {
                    return { orderTrackId, ...orderTracks[orderTrackId] }; // Return both orderTrackId and the details
                }
            }
            throw new Error("Order with the specified itemId not found");
        } else {
            throw new Error("Order tracks not found");
        }
    } catch (error) {
        console.error("Error fetching order track details:", error);
        return null;
    }
};




export const sendMessage = async (orderId, message) => {
    
    const messagesRef = ref(database, `order-track/${orderId}/requests/0/messages`);

    try {
        await push(messagesRef, message);
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Error sending message");
    }

};