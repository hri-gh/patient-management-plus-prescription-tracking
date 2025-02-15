import React, { useEffect, useState } from 'react'

// UI COMPONENTS

import { Modal } from "@/components/ui/modal";
import { PrescriptionCreateForm } from '../prescription/prescription-create-form';

interface PrescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
}

export const PrescriptionCreateModal: React.FC<PrescriptionModalProps> = ({
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
            <PrescriptionCreateForm />
        </Modal>
    )
}
