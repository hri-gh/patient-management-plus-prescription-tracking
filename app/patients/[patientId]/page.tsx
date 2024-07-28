'use client'

import { ProfileDetails } from '@/components/patient/profile-details'
import React from 'react'


const Patient = ({ params }: { params: { patientId: string } }) => {

    return (
        <div>
            <ProfileDetails />
            <h1>Patient Id: {params.patientId}</h1>
        </div>
    )
}

export default Patient


