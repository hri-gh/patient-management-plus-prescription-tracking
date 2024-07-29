import { Prescription } from '@/store/prescription-store'
import React from 'react'

const PrescriptionEditForm = ({ prescription }: { prescription: Prescription }) => {
  return (
    <div>
      PrescriptionEditForm: {prescription._id}
    </div>
  )
}

export default PrescriptionEditForm
