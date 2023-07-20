import { useEffect, useState } from "react";

const useMockData = (mock) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const callMock = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
        const fetchData = async () => {
            await callMock();
            setData(mock);
            setLoading(false);
        }
        fetchData();
    }, [])

    return { data, loading }
}

export default useMockData;
