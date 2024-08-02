import React from 'react'
import clsx from 'clsx';
import { usePatientStore } from '@/store/patient-store'
import { DataTable } from '@/components/ui/data-table'
import { PatientColumn, columns } from './columns'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { useEffect } from 'react'
import { PanelRightOpen } from 'lucide-react';
// HOOKS
import { useFetchPatients } from '@/hooks/useFetchPatients'
import { Separator } from '@/components/ui/separator';

interface PatientClientProps {
    patients: PatientColumn[]
}

const AllPatientsList = () => {
    const { data, error, loading, refetch } = useFetchPatients()
    const { setPatients, patients } = usePatientStore()

    useEffect(() => {
        if (data) {
            setPatients(data);
        }
    }, [data]);

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className='flex mx-auto mb-2 h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
                        <PanelRightOpen />
                        All Patients
                    </Button>
                </SheetTrigger>
                <SheetContent className=''>
                    <SheetTitle >Patients List</SheetTitle>
                    <Separator className='my-2'/>
                    <SheetDescription>

                    </SheetDescription>
                    <DataTable data={patients} columns={columns} searchKey='name' />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AllPatientsList

