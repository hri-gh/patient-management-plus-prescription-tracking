import React, { useEffect, useState } from 'react'

// UI COMPONENTS

import { Modal } from "@/components/ui/modal";
import { PatientRegisterForm } from '../patient/patient-register-form';

interface PatientRegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
}

export const PatientRegisterModal: React.FC<PatientRegisterModalProps> = ({
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
            modalClass='max-w-xl '
        >
            {loading && (
                <h1 className=''>Loading...</h1>
            )}
            <PatientRegisterForm />
        </Modal>
    )
}
