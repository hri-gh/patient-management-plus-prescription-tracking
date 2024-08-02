import React, { useEffect, useState } from 'react'

// UI COMPONENTS

import { Modal } from "@/components/ui/modal";
import { PatientEditForm } from '../patient/patient-edit-form';

import { PatientData } from '@/types/patient.interface';

interface PatientEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
    patient: PatientData;
}

export const PatientEditModal: React.FC<PatientEditModalProps> = ({
    isOpen,
    onClose,
    loading,
    patient,
}) => {
    console.log("EM:",patient)
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
            <PatientEditForm patient={patient} />
        </Modal>
    )
}
