'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { Combobox } from '@/components/ui/combobox'

import { PrescriptionCreateModal } from '@/components/modals/prescription-create-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import usePrescriptionCreateModalStore from '@/store/prescription-create-modal-store';
import { usePrescriptionStore } from '@/store/prescription-store';
import { useFetchPrescriptions } from '@/hooks/useFetchPrescriptions';
import PrescriptionList from '@/components/prescription/prescription-list';

const year = [
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
]


const Patient = ({ params }: { params: { patientId: string } }) => {

    const { data, error, loading, refetch } = useFetchPrescriptions(params.patientId)
    const { prescriptions, setPrescriptions } = usePrescriptionStore()

    const { open, loading: modalLoading, setOpen, setLoading } = usePrescriptionCreateModalStore()

    useEffect(() => {
        if (data) {
            setPrescriptions(data);
        }
    }, [data]);

    const handlePrescriptionCreateModal = () => {
        setLoading(true);
        setOpen(true)
        setLoading(false)
    }

    return (
        <div>
            {/* <ProfileDetails /> */}
            {/* <h1>Patient Id: {params.patientId}</h1> */}
            <PrescriptionCreateModal
                isOpen={open}
                loading={modalLoading}
                onClose={() => setOpen(false)}
            />
            <div className='flex flex-wrap md:justify-between justify-center gap-2'>
            <Button onClick={handlePrescriptionCreateModal}><Plus />Create New Prescription</Button>
            <Combobox options={year}
                placeholder='Select year'
                onChange={() => { }}
                value=''
            />
            </div>
            <Separator className='my-4' />
            <PrescriptionList />
        </div>
    )
}

export default Patient


