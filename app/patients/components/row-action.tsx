"use client"

import React from 'react'
import { useParams, useRouter } from "next/navigation";

import { PatientColumn } from './columns';

interface RowActionProps {
    _id: string
}

const RowAction = ({ data }: { data: PatientColumn }) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div onClick={() => router.push(`/patients/${data._id}/prescriptions`)} className="cursor-pointer  hover:text-sky-500 hover:underline">{data.name}</div>
        </>
    )
}

export default RowAction
