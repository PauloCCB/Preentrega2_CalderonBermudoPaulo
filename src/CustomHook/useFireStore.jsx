import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFireStore = (collectionMock) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const querySnapshot = await getDocs(collection(db, collectionMock));
                const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setData(newData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(true)
            }
        };

        fetchData();
    }, [collectionMock]);

    return { data, loading, error };
}

export default useFireStore;