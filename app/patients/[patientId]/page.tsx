'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { Combobox } from '@/components/ui/combobox'
import { ProfileDetails } from '@/components/patient/profile-details';

import { PrescriptionModal } from '@/components/modals/prescription-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import usePrescriptionModalStore from '@/store/prescription-modal-store';

const Patient = ({ params }: { params: { patientId: string } }) => {

    const { open, loading, setOpen, setLoading } = usePrescriptionModalStore()

    const handleCreateNewPrescription = () => {
        setLoading(true);
        setOpen(true)
        setLoading(false)
    }

    return (
        <div>
            {/* <ProfileDetails /> */}
            <h1>Patient Id: {params.patientId}</h1>
            <PrescriptionModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false)}
            />
            <Button onClick={handleCreateNewPrescription}><Plus />Create New Prescription</Button>
            <Separator className='my-4' />
        </div>
    )
}

export default Patient


