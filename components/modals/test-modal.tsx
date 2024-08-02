"use client"

import React, { useEffect, useState } from 'react'

// UI COMPONENTS

import { Modal } from "@/components/ui/modal";
import { TestForm } from '../prescription/test-form';

interface TestModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
}

export const TestModal: React.FC<TestModalProps> = ({
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
            <TestForm />
        </Modal>
    )
}
