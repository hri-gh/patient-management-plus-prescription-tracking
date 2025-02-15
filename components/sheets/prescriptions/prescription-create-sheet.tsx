import React from 'react'
import clsx from 'clsx';


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import { PrescriptionCreateForm } from '@/components/prescription/prescription-create-form';
import { Plus } from 'lucide-react';

const PrescriptionCreateSheet = ({ patientId }: { patientId: string }) => {


    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={'icon'} className='w-6 h-6'>
                        <Plus />
                    </Button>
                </SheetTrigger>
                {/* className="w-[400px] sm:w-[540px]" */}
                {/* <SheetContent className="xl:w-[1000px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]"> */}
                <SheetContent className="sm:max-w-[750px]">
                    <SheetTitle >{patientId}</SheetTitle>
                    {/* <Separator className='my-2' /> */}
                    <SheetDescription>

                    </SheetDescription>
                    <PrescriptionCreateForm patientId={patientId} />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default PrescriptionCreateSheet
