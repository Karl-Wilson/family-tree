    import { collection, query, where, getDocs } from "firebase/firestore";
    import db from './config'

export const loginConnector = async (username, password) =>{
    let found = false
    const q = query(collection(db, "admin"), where("username", "==", username), where("password", "==", password));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "query")
    querySnapshot.forEach((doc) => {
        found = doc.id;
    });
    return found;
}
// export const loginConnector = async (username, password) =>{
//     let found = false
//     let adminRef = db.collection("admin")
//     let query = adminRef.where("username", "==", username)
//     query.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             found = doc.id
//         });
//     }).catch((error) => {
//         console.log("Error getting documents: ", error);
//     });

//     return found
// }