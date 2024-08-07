import React, { useState } from 'react'
import { usePrescriptionStore } from '@/store/prescription-store'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const SortPrescriptionsByNewOld = () => {
    const { sortOption, setSortOption } = usePrescriptionStore();
    return (
        <>
            <Select
            onValueChange={(value) => setSortOption(value)}
            defaultValue='new'
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="old">Old</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}


export default SortPrescriptionsByNewOld
