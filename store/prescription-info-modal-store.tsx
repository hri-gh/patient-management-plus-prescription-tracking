// modalStore.js
import { create } from 'zustand';

interface ModalState {
    open: boolean;
    loading: boolean;
    setOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
}

const usePrescriptionInfoModalStore = create<ModalState>((set) => ({
    open: false,
    loading: false,
    setOpen: (open) => set({ open }),
    setLoading: (loading) => set({ loading }),
}));

export default usePrescriptionInfoModalStore;
