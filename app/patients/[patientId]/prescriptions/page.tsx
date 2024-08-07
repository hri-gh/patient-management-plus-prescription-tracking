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
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { PrescriptionCreateForm } from '@/components/prescription/prescription-create-form';
import FilterPrescriptionsByYear from '@/components/prescription/sorting-filtering/filter-prescriptions-by-year';
const years = [
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
]
const payment = [
    { label: 'Due', value: 'due' },
    { label: 'Paid', value: 'paid' },
]
import PrescriptionContainer from '@/components/prescription/prescription-container';
import SortPrescriptionsByNewOld from '@/components/prescription/sorting-filtering/sort-new-old-prescriptions';
import FilterPrescriptionsByPaymentStatus from '@/components/prescription/sorting-filtering/filter-prescriptions-by-payment-status';
import ResetPrescriptions from '@/components/prescription/sorting-filtering/reset-prescriptions';

const Patient = ({ params }: { params: { patientId: string } }) => {
    const [year, setYear] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")

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
            {/* <PrescriptionCreateModal
                isOpen={open}
                loading={modalLoading}
                onClose={() => setOpen(false)}
            /> */}
            <ResizablePanelGroup
                direction="horizontal"

            >
                <ResizablePanel >
                    <div className='flex my-2 gap-2'>
                        <FilterPrescriptionsByYear />
                        <SortPrescriptionsByNewOld/>
                        <FilterPrescriptionsByPaymentStatus/>
                        <ResetPrescriptions/>
                        {/* <Combobox
                        options={payment}
                        placeholder='Select status'
                        onChange={(value) => setPaymentStatus(value)}
                        value={paymentStatus}
                    />
                    <Combobox
                        options={years}
                        placeholder='Select year'
                        onChange={(value) => setYear(value)}
                        value={year}
                    /> */}
                    </div>
                    <Separator className='mt-2' />
                    <PrescriptionContainer />
                </ResizablePanel>

                <ResizableHandle withHandle className='ml-2' />

                <ResizablePanel defaultSize={40}>
                    <div className="ml-3">
                        <PrescriptionCreateForm />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>

            {/* <div className='flex flex-wrap md:justify-between justify-center gap-2'> */}
            {/* <Button onClick={handlePrescriptionCreateModal}><Plus />Create New Prescription</Button> */}

            {/* </div> */}
            {/* <Separator className='my-4' /> */}

        </div>
    )
}

export default Patient


