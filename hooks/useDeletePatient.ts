import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/api-response';

const useDeletePatient = <T>() => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiResponse | null>(null);

    const deletePatient = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`/api/patients/${id}`);
            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            const axiosError = err as AxiosError<ApiResponse>;

            // Default error message
            let errorMessage = axiosError.response?.data || {
                success: false,
                message: 'An error occurred while trying to delete the patient.',
            };

            // Set error message
            setError(errorMessage);
        }
    };

    return { deletePatient, loading, error };
};

export default useDeletePatient;
