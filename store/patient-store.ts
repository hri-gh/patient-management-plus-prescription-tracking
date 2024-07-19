import { create } from 'zustand'
import { PatientData as Patient } from '@/types/patient.interface';

// interface Patient {
//     _id: string;
//     name: string;
//     mobile: number;
//     email: string;
//     age: number;
//     place: string;
//     gender: string;
// }

interface PatientStore {
    patients: Patient[];
    setPatients: (patients: Patient[]) => void;
    addPatient: (user: Patient) => void;
    deletePatient: (id: string) => void;
    editPatient: (id: string, updatedPatient: Partial<Patient>) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
    patients: [],
    setPatients: (patients) => set({ patients }),
    addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),
    deletePatient: (id) => set((state) => ({ patients: state.patients.filter(patient => patient._id !== id) })),
    editPatient: (id, updatedPatient) => set((state) => ({
        patients: state.patients.map(patient =>
            patient._id === id ? { ...patient, ...updatedPatient } : patient
        ),
    })),
}));
