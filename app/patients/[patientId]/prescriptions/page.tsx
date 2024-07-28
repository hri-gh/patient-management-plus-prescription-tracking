'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { Combobox } from '@/components/ui/combobox'
import { ProfileDetails } from '@/components/patient/profile-details';

import { PrescriptionCreateModal } from '@/components/modals/prescription-create-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import usePrescriptionCreateModalStore from '@/store/prescription-create-modal-store';
import { usePrescriptionStore } from '@/store/prescription-store';
import { useFetchPrescriptions } from '@/hooks/useFetchPrescriptions';
import PrescriptionList from '@/components/prescription/prescription-list';


const Patient = ({ params }: { params: { patientId: string } }) => {

    const { data, error, loading, refetch } = useFetchPrescriptions(params.patientId)
    const { prescriptions, setPrescriptions } = usePrescriptionStore()

    const { open, loading: modalLoading, setOpen, setLoading } = usePrescriptionCreateModalStore()

    useEffect(() => {
        if (data) {
            setPrescriptions(data);
        }
    }, [data]);

console.log(prescriptions)

    const handlePrescriptionCreateModal = () => {
        setLoading(true);
        setOpen(true)
        setLoading(false)
    }

    return (
        <div>
            {/* <ProfileDetails /> */}
            <h1>Patient Id: {params.patientId}</h1>
            <PrescriptionCreateModal
                isOpen={open}
                loading={modalLoading}
                onClose={() => setOpen(false)}
            />
            <Button onClick={handlePrescriptionCreateModal}><Plus />Create New Prescription</Button>
            <Separator className='my-4' />
            <PrescriptionList />
        </div>
    )
}

export default Patient


