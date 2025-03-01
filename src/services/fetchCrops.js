import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase.config';
const fetchCrops = () => {
    const itemsRef = ref(database, 'crops/');

    return new Promise(resolve => {
        onValue(itemsRef, (snapshot) => {
            const snapVal = snapshot.val();
            var rawItemsList = [];
            for (const id in snapVal) {
                rawItemsList.push({ ...snapVal[id], id });
            }
            resolve(rawItemsList)
        });
    })
}
export default fetchCrops