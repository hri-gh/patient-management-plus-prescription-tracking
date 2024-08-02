import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/api-response';

const useDeletePrescription = <T>() => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiResponse | null>(null);

    const deletePrescription = async (patientId: string, prescriptionId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`/api/patients/${patientId}/prescriptions/${prescriptionId}`);
            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            const axiosError = err as AxiosError<ApiResponse>;

            // Default error message
            let errorMessage = axiosError.response?.data || {
                success: false,
                message: 'An error occurred while trying to delete the prescription.',
            };

            // Set error message
            setError(errorMessage);
        }
    };

    return { deletePrescription, loading, error };
};

export default useDeletePrescription;
