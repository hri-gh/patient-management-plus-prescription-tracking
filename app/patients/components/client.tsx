"use client"

import React from 'react'
import { useState, useEffect } from 'react';

// COMPONENTS IMPORT
import { UserNav } from "@/components/user-nav"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { DataTable } from '@/components/ui/data-table';
import { PatientRegisterModal } from '@/components/modals/patient-register-modal';


// ICONS IMPORT
import { PlusIcon } from "@radix-ui/react-icons"

import { PatientColumn, columns } from './columns';


interface PatientClientProps {
    data: PatientColumn[]
}


export const PatientClient = ({ data }: PatientClientProps) => {
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
            <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your patients!
                        </p>
                    </div>
                    <div className="flex items-center gap-2 space-x-2">
                        <Button onClick={handleAddNewPatient} className="gap-2 font-bold hover:bg-gray-600 border-white">Add New Patient <PlusIcon /></Button>
                        <UserNav />
                    </div>
                </div>
                <Separator />
                <DataTable data={data} columns={columns} searchKey={'name'} />
            </div>
        </>
    )
}
