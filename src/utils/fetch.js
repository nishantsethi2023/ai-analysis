import {useEffect, useState} from 'react';

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async(url,options ) => {
        try{
            const response = await fetch(url, {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                },
                body: options.method === 'POST' ? JSON.stringify(options.body): null,
            });
            if(!response.ok){
                throw new Error("Network request")
            }

            const result = await response.json();
            console.log(result, "result");
            setData(result)
        } catch(err){
            setError(err);
        } finally {
            setLoading(false);
        }
        };
    useEffect(() => {
        console.log(url, options, 232);
        // fetchData();

    },[url, options])
    return {data, loading, error};
}

export default useFetch;