// // hooks/useFetchUsers.ts
import useGetApi from './useGetApi';
import { PatientData } from '@/types/patient.interface';

export const useFetchPatient = (patientId: string) => {
    return useGetApi<PatientData>(`/api/patients/${patientId}`);
};
