"use client"

import React, { useState } from 'react'
// import {PatientRegisterForm} from '@/components/patient/patient-register-form'
import { TestModal } from '@/components/modals/test-modal'
import { Button } from '@/components/ui/button'
import { TestForm } from '@/components/prescription/test-form'

const TestPage = () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleTestModal = () => {
        setLoading(true);
        setOpen(true)
        setLoading(false)
    }

    return (
        <>
            <TestModal
                isOpen={open}
                onClose={() => setOpen(false)}
                loading={loading}
            />
            <Button onClick={handleTestModal}>Test Modal</Button>
            {/* <PrescriptionForm /> */}
            <TestForm />
        </>
    )
}

export default TestPage
