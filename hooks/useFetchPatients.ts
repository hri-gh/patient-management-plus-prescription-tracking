// // hooks/useFetchUsers.ts
import useGetApi from './useGetApi';
import { PatientData } from "@/types/patient.interface";

export const useFetchPatients = () => {
    return useGetApi<PatientData[]>('/api/patients');
};
