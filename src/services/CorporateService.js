import { database } from "../../firebase.config";
import { ref, set } from "firebase/database";
export const createCorporateProfile = ({ data, user }) => {

    return new Promise(resolve => {
        try {
            const userRef = ref(database, `users/${user.uid}/corporateData`)
            set(userRef, {
                ...data, timeStamp: Date.now(), lastUpdate: Date.now()
            }).then(() => {
                resolve(true)
            })
        }
        catch (e) {
            throw Error(e)
        }
    })

}

export const editCorporateProfile = ({ data, user }) => {

    return new Promise(resolve => {
        try {
            const userRef = ref(database, `users/${user.uid}/corporateData`)
            set(userRef, {
                ...data, lastUpdate: Date.now()
            }).then(() => {
                resolve(true)
            })
        }
        catch (e) {
            throw Error(e)
        }
    })

}