import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/api-response';

const useDeletePatient = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiResponse | null>(null);

    const deletePatient = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`/api/patients/${id}`);
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            const axiosError = err as AxiosError<ApiResponse>;

            // Default error message
            let errorMessage = axiosError.response?.data || {
                success: false,
                message: 'Error while deleting. Please try again.'
            };

            // Set error message
            setError(errorMessage);
            // throw new Error(errorMessage.message); // Re-throw the error to be caught in the component
        }
    };

    return { deletePatient, loading, error };
};

export default useDeletePatient;
