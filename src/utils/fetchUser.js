import { database } from '../../firebase.config';
import { onValue, ref } from 'firebase/database';
const fetchUser = ({ user }) => {

    const userRef = ref(database, `users/${user.uid}`);
    return new Promise(resolve => {
        onValue(userRef, (snapshot) => {
            const snapVal = snapshot.val();
            resolve({ ...snapVal, uid: user.uid, phone: user.phoneNumber })

        });
    })
}

export default fetchUser