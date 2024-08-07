import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/api-response';

const usePaymentReminder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiResponse | null>(null);

    const paymentReminder= async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`/api/patients/${id}/payment_reminder`);
            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            const axiosError = err as AxiosError<ApiResponse>;

            // Default error message
            let errorMessage = axiosError.response?.data || {
                success: false,
                message: 'An error occurred while trying to send payment reminder email the patient.',
            };

            // Set error message
            setError(errorMessage);
        }
    };

    return { paymentReminder, loading, error };
};

export default usePaymentReminder;
