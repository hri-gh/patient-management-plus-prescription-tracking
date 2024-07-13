// hooks/useGetApi.ts
import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

const useGetApi = <T>(url: string, config?: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [cancelSource, setCancelSource] = useState<CancelTokenSource | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const source = axios.CancelToken.source();
        setCancelSource(source);

        try {
            const response = await axios.get<T>(url, { ...config, cancelToken: source.token });
            setData(response.data);
        } catch (err) {
            // if (!axios.isCancel(err)) {

            //     setError(err);
            // }
            if (axios.isCancel(err)) {
                // If the request was canceled, do not set an error
                return;
            } else if (axios.isAxiosError(err)) {
                setError(new Error(err.message)); // Handle Axios-specific errors
            } else if (err instanceof Error) {
                setError(err); // Handle other errors
            } else {
                setError(new Error('An unknown error occurred')); // Fallback for unknown errors
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        return () => {
            if (cancelSource) {
                cancelSource.cancel('Component unmounted');
            }
        };
    }, [url]);

    return { data, error, loading, refetch: fetchData };
};

export default useGetApi;
