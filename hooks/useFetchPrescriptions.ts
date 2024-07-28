// // hooks/useFetchUsers.ts
import useGetApi from './useGetApi';
import { Prescription } from '@/store/prescription-store';
export const useFetchPrescriptions = (patientId: string) => {
    return useGetApi<Prescription[]>(`/api/patients/${patientId}/prescriptions`);
};
