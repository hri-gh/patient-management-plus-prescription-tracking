import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from "next/navigation"
// UI COMPONENTS

import { Modal } from "@/components/ui/modal";
import PrescriptionEditForm from '../prescription/prescription-edit-form';
import { Prescription } from '@/store/prescription-store';

interface PrescriptionEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
    prescription: Prescription;
}

export const PrescriptionEditModal: React.FC<PrescriptionEditModalProps> = ({
    isOpen,
    onClose,
    loading,
    prescription

}) => {

    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    // console.log("EDIT_MODAL::", prescription)

    // useEffect(() => {
    //     if (isOpen && prescription) {
    //         // Construct the new URL
    //         const newUrl = `${pathname}/${prescription._id}`;
    //         console.log("NEW_URL::", pathname)
    //         // Update the URL without refreshing the page
    //         // router.replace(newUrl);
    //         if (window.location.pathname !== newUrl) {
    //             window.history.pushState(null, '', newUrl);
    //         }
    //     }
    // }, []);


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
            <PrescriptionEditForm  prescription={prescription}/>
        </Modal>
    )
}
