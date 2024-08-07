import { create } from 'zustand'

export interface Drug {
    _id: string;
    drugName: string;
    quantity: string;
    price: number;
}

export interface Payment {
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
}

export interface Prescription {
    prescription: { drugName: string; quantity: string; price: number; };
    _id: string;
    drugs: Drug[];
    payment: Payment;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface PrescriptionStore {
    prescriptions: Prescription[];
    selectedPrescription: Prescription | null,

    setSelectedPrescription: (prescription: Prescription | null) => void;
    setPrescriptions: (prescriptions: Prescription[]) => void;
    addPrescription: (prescription: Prescription) => void;
    deletePrescription: (_id: string) => void;
    editPrescription: (_id: string, updatedPrescription: Partial<Prescription>) => void;

    // addDrug: (prescriptionId: string, drug: Drug) => void;
    // editDrug: (prescriptionId: string, drugId: string, updatedDrug: Partial<Drug>) => void;
    // deleteDrug: (prescriptionId: string, drugId: string) => void;

    // Sorting & Filtering
    sortOption: string;
    filterYear: number | null;
    filterPaymentStatus: 'Paid' | 'Due' | 'All';

    setSortOption: (option: string) => void;
    setFilterYear: (year: number | null) => void;
    setFilterPaymentStatus: (status: 'Paid' | 'Due' | 'All') => void;
    getFilteredPrescriptions: () => Prescription[];
    resetFilters: () => void;
    prescriptionCount: () => number;
    filteredPrescriptionCount: () => number;

}


export const usePrescriptionStore = create<PrescriptionStore>((set, get) => ({
    prescriptions: [],
    selectedPrescription: null,
    setSelectedPrescription: (prescription) => set({ selectedPrescription: prescription }),
    setPrescriptions: (prescriptions) => set({ prescriptions }),
    addPrescription: (prescription) => set((state) => ({ prescriptions: [...state.prescriptions, prescription] })),
    deletePrescription: (_id) => set((state) => ({ prescriptions: state.prescriptions.filter(prescription => prescription._id !== _id) })),
    editPrescription: (_id, updatedPrescription) => set((state) => ({
        prescriptions: state.prescriptions.map(prescription =>
            prescription._id === _id ? { ...prescription, ...updatedPrescription } : prescription
        ),
    })),

    // Sorting & Filtering
    sortOption: 'new',
    filterYear: null,
    filterPaymentStatus: 'All',

    setSortOption: (option) => set({ sortOption: option }),
    setFilterYear: (year) => set({ filterYear: year }),
    setFilterPaymentStatus: (status) => set({ filterPaymentStatus: status }),

    // addDrug: (prescriptionId, drug) => set((state) => ({
    //     prescriptions: state.prescriptions.map(prescription =>
    //         prescription._id === prescriptionId ? { ...prescription, drugs: [...prescription.drugs, drug] } : prescription
    //     ),
    // })),

    // editDrug: (prescriptionId, drugId, updatedDrug) => set((state) => ({
    //     prescriptions: state.prescriptions.map(prescription =>
    //         prescription._id === prescriptionId ? {
    //             ...prescription,
    //             drugs: prescription.drugs.map(drug => drug._id === drugId ? { ...drug, ...updatedDrug } : drug)
    //         } : prescription
    //     ),
    // })),

    // deleteDrug: (prescriptionId, drugId) => set((state) => ({
    //     prescriptions: state.prescriptions.map(prescription =>
    //         prescription._id === prescriptionId ? {
    //             ...prescription,
    //             drugs: prescription.drugs.filter(drug => drug._id !== drugId)
    //         } : prescription
    //     ),
    // })),


    // Sorting & Filtering Function
    getFilteredPrescriptions: () => {
        const { prescriptions, sortOption, filterYear, filterPaymentStatus } = get();

        let filtered = [...prescriptions];

        // Sort prescriptions
        if (sortOption === 'new') {
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortOption === 'old') {
            filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }

        // Filter by year
        if (filterYear) {
            filtered = filtered.filter(prescription => new Date(prescription.createdAt).getFullYear() === filterYear);
        }

        // Filter by payment status
        if (filterPaymentStatus !== 'All') {
            filtered = filtered.filter(prescription => {
                if (filterPaymentStatus === 'Paid') {
                    return prescription.payment.dueAmount === 0;
                } else {
                    return prescription.payment.dueAmount > 0;
                }
            });
        }

        return filtered;
    },
    resetFilters: () => set({ sortOption: 'new', filterYear: null, filterPaymentStatus: 'All' }),
    prescriptionCount: () => get().prescriptions.length,
    filteredPrescriptionCount: () => get().getFilteredPrescriptions().length
}));


