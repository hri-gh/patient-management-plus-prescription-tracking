import React from 'react'
import PrescriptionPreviewCard from './prescription-preview-card'

import { usePrescriptionStore } from '@/store/prescription-store';


const PrescriptionList = () => {
    const { prescriptions } = usePrescriptionStore()

    return (
        <>
            <div className="mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    prescriptions.map((prescription) => (
                        <PrescriptionPreviewCard key={prescription._id} prescription={prescription} />
                    ))
                }
            </div>
        </>
    )
}

export default PrescriptionList
