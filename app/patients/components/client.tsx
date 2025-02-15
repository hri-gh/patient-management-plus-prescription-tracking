"use client"

import React from 'react'
import { useState, useEffect } from 'react';

// COMPONENTS IMPORT
import { DataTable } from '@/components/ui/data-table';
import { PatientRegisterModal } from '@/components/modals/patient-register-modal';

// HOOKS
import { useFetchPatients } from '@/hooks/useFetchPatients'

// STORE
import { usePatientStore } from '@/store/patient-store'


// ICONS IMPORT

import { PatientColumn, columns } from './columns';

interface PatientClientProps {
    data: PatientColumn[]
}


export const PatientClient = ({ data }: PatientClientProps) => {

    const { setPatients, patients } = usePatientStore()

    useEffect(() => {
        if (data) {
            setPatients(data);
        }
    }, [data]);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddNewPatient = () => {
        setLoading(true)
        setOpen(true)
        setLoading(false)
    };

    return (
        <>
            <PatientRegisterModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false)}
            />
            {/* <div className="flex flex-col min-h-screen"> */}

            <main className="flex-1 p-4 md:p-6">
                <div className='mb-6'>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your patients!
                    </p>
                </div>
                <DataTable data={patients} columns={columns} searchKey={'name'} />
            </main>
            {/* </div> */}
        </>
    )
}
