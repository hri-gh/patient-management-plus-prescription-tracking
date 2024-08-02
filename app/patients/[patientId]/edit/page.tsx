"use client"

import React from 'react'
import { PatientEditForm } from '@/components/patient/patient-edit-form'
import { useFetchPatient } from '@/hooks/useFetchPatient';

const PatientEditPage = ({ params }: { params: { patientId: string } }) => {
    const patientId = params.patientId
    const { data, error, loading, refetch } = useFetchPatient(patientId)
    return (
        <>
            {data && <PatientEditForm patient={data} />}
        </>
    )
}

export default PatientEditPage
