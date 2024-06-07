import {useState, useEffect} from 'react';

const useFetchData = (url: string): { data: PlayerType[] | null; isLoading: boolean; isError: boolean } => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return {data, isLoading, isError};
};

export default useFetchData;