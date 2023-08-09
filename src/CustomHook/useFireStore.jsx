import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react";

const useFireStore = (collectionName) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore()
                const querySnapshot = await getDocs(collection(db, collectionName))
                const newData = querySnapshot.docs.map((doc) => ({
                    id: doc.id, ...doc.data()
                }))
                setData(newData);
                setLoading(false)
            }
            catch (error) {
                console.log(error);
                setLoading(false)
                setError(true)
            }
        }
        fetchData();
    }, [collectionName])

    return { data, loading, error }
}

export default useFireStore;
