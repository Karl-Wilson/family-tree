    import { collection, query, where, getDocs, getDoc, doc, setDoc, serverTimestamp, addDoc, writeBatch, runTransaction } from "firebase/firestore";
    import db from './config'
import treeGenerator from "../utils/treeGenerator";
export const loginConnector = async (username, password) =>{
    let found = false
    const q = query(collection(db, "admin"), where("username", "==", username), where("password", "==", password));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        found = doc.id;
    });
    return found;
}
export const fetchFamilyTree = async () =>{
    const docRef = doc(db, "familyTree", "v1.0");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return null
}
export const fetchColorKey = async()=>{
    let result = []
    const querySnapshot = await getDocs(collection(db, "colorKeys"));
    querySnapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()})
    });
   
    if(result.length){
        return result
    }

    return null
}

export const fetchMemberList = async () =>{
    let result = []
    const querySnapshot = await getDocs(collection(db, "members"));
    querySnapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()})
    });
   
    if(result.length){
        return result
    }

    return null
}

export const addMemberToList = async (data) =>{
    let found = false
    //check if member exists in database
    const q = query(collection(db, "members"), where("parentId", "==", data.parentId), where("firstname", "==", data.firstname), where("lastname", "==", data.lastname));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        found = doc.id;
    });

    //if yes throw error, if no, store new member
    if(found){
        return found
    }else{
        //add member
        const docRef = await addDoc(collection(db, "members"), {
        ...data
        });
        if(docRef.id){
            return docRef.id
        }
    }
    return null;
}
export const fetchDataFromCollection = async (collectionName, fieldName, data) =>{
    let result = []
    const q = query(collection(db, collectionName), where(fieldName, "==", data));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()})
    });

    if(result.length){
        return result
    }

    return null
}

export const createFamilyTree = async (data) =>{
    await setDoc(doc(db, 'familyTree', 'v1.0'), { 
        tree: data,
        created: serverTimestamp(),
    }, { merge: true });
}

export const addTreeAndLog = async(data, log, familyTree) =>{
    // Get a new write batch
    try{
        const batch = writeBatch(db);

        const treeRef = doc(db, "familyTree", "v1.0");
        batch.update(treeRef, {"tree" : familyTree, "updated": serverTimestamp()});

        const logRef = doc(collection(db, "log"));
        batch.set(logRef, {data: data, created: serverTimestamp(), ...log});

        // Commit the batch
        await batch.commit();
    }catch(e){
        throw new Error(e.message)
    }
}