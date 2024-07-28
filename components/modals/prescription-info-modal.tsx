"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from "next/navigation"
// UI COMPONENTS

import { Modal } from "@/components/ui/modal";
import PrescriptionInfoCard from '../prescription/prescription-info-card';
import { Prescription } from '@/store/prescription-store';

interface PrescriptionInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
    prescription: Prescription;
}

export const PrescriptionInfoModal: React.FC<PrescriptionInfoModalProps> = ({
    isOpen,
    onClose,
    loading,
    prescription

}) => {

    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    console.log("PATHNAME::", pathname)

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
            <PrescriptionInfoCard />
        </Modal>
    )
}
