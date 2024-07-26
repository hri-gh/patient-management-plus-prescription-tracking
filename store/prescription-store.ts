import { create } from 'zustand'

export interface Drug {
    _id: string;
    drugName: string;
    quantity: number;
    price: number;
}

export interface Payment {
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
}

export interface Prescription {
    _id: string;
    drugs: Drug[];
    payment: Payment;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

interface PrescriptionStore {
    prescriptions: Prescription[];
    setPrescriptions: (prescriptions: Prescription[]) => void;
    addPrescription: (prescription: Prescription) => void;
    deletePrescription: (_id: string) => void;
    editPrescription: (_id: string, updatedPrescription: Partial<Prescription>) => void;

    addDrug: (prescriptionId: string, drug: Drug) => void;
    // editDrug: (prescriptionId: string, drugId: string, updatedDrug: Partial<Drug>) => void;
    deleteDrug: (prescriptionId: string, drugId: string) => void;
}


export const usePrescriptionStore = create<PrescriptionStore>((set) => ({
    prescriptions: [],
    setPrescriptions: (prescriptions) => set({ prescriptions }),
    addPrescription: (prescription) => set((state) => ({ prescriptions: [...state.prescriptions, prescription] })),
    deletePrescription: (_id) => set((state) => ({ prescriptions: state.prescriptions.filter(prescription => prescription._id !== _id) })),
    editPrescription: (_id, updatedPrescription) => set((state) => ({
        prescriptions: state.prescriptions.map(prescription =>
            prescription._id === _id ? { ...prescription, ...updatedPrescription } : prescription
        ),
    })),
    addDrug: (prescriptionId, drug) => set((state) => ({
        prescriptions: state.prescriptions.map(prescription =>
            prescription._id === prescriptionId ? { ...prescription, drugs: [...prescription.drugs, drug] } : prescription
        ),
    })),
    // editDrug: (prescriptionId, drugId, updatedDrug) => set((state) => ({
    //     prescriptions: state.prescriptions.map(prescription =>
    //         prescription._id === prescriptionId ? {
    //             ...prescription,
    //             drugs: prescription.drugs.map(drug => drug._id === drugId ? { ...drug, ...updatedDrug } : drug)
    //         } : prescription
    //     ),
    // })),
    deleteDrug: (prescriptionId, drugId) => set((state) => ({
        prescriptions: state.prescriptions.map(prescription =>
            prescription._id === prescriptionId ? {
                ...prescription,
                drugs: prescription.drugs.filter(drug => drug._id !== drugId)
            } : prescription
        ),
    })),
}));
