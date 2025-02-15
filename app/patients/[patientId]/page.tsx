
import PatientDetails from '@/components/patient/patient-details'
import React from 'react'


const Patient = ({ params }: { params: { patientId: string } }) => {
    try {
        return (
            <div className=''>
                {/* <h1>Patient Id: {params.patientId}</h1> */}
                {/* Render patient details here */}
                <PatientDetails />
            </div>
        )
    } catch (error) {
        console.error('Error fetching patient data:', error)
        // Render an error message or component
        return (
            <div className=''>
                <h1>Failed to load patient data</h1>
                <p>{(error as Error).message}</p>
            </div>
        )
    }
}

export default Patient


