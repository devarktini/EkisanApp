import { auth, database } from '../../../firebase.config';
import { push, ref } from "firebase/database"

const sendNotifiation = ({ userId,
    title = "",
    description = "",
    type = "",
    buttonText = null,
    buttonUrl = null
}) => {
    return new Promise(async resolve => {
        const notifiationRef = ref(database, `users/${userId}/notifications`)
        await push(notifiationRef, {
            title,
            description,
            type,
            buttonText,
            buttonUrl,
            timestamp: Date.now()
        })
        resolve(true)
    })

}

export default sendNotifiation