import React from 'react'

const PatientEditPage = ({ params }: { params: { patientId: string } }) => {
    return (
        <div>PatientEditPage :{params.patientId}</div>
    )
}

export default PatientEditPage
