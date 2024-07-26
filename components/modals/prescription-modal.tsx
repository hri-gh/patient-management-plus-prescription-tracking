import React, { useEffect, useState } from 'react'

// UI COMPONENTS

import { Modal } from "@/components/ui/modal";
import { PrescriptionForm } from '../prescription/prescription-form';


interface PrescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
    isOpen,
    onClose,
    loading,

}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (

        <Modal
            title=''
            description=''
            isOpen={isOpen}
            onClose={onClose}
            modalClass='max-w-2xl'
        >
            {loading && (
                <h1 className=''>Loading...</h1>
            )}
            <PrescriptionForm />
        </Modal>
    )
}
