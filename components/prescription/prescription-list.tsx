import React, { useState } from 'react'
import PrescriptionPreviewCard from './prescription-preview-card'
import { usePrescriptionStore } from '@/store/prescription-store';
import { PrescriptionInfoModal } from "../modals/prescription-info-modal";
import usePrescriptionInfoModalStore from "@/store/prescription-info-modal-store";
import { Prescription } from '@/store/prescription-store';
import usePrescriptionEditModalStore from '@/store/prescription-edit-modal-store';
import { PrescriptionEditModal } from '../modals/prescription-edit-modal';

const PrescriptionList = () => {
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

    const { open: openInfoModal, loading: infoModalLoading, setLoading: setInfoModalLoading, setOpen: setInfoModalOpen } = usePrescriptionInfoModalStore()
    const { open: openEditModal, loading: editModalLoading, setLoading: setEditModalLoading, setOpen: setEditModalOpen } = usePrescriptionEditModalStore()

    const { prescriptions } = usePrescriptionStore()

    const handlePrescriptionInfoModal = (prescription: Prescription) => {
        // console.log("Selected Prescription_INFO:", prescription);
        setSelectedPrescription(prescription);
        setInfoModalOpen(true);
    }

    const handlePrescriptionEditModal = (prescription:Prescription) => {
        // console.log("Selected Prescription_EDIT:", prescription);
        setSelectedPrescription(prescription)
        setEditModalOpen(true)
    }

    return (
        <>
            <div className="mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    prescriptions.map((prescription: Prescription) => (
                        <PrescriptionPreviewCard
                            key={prescription._id}
                            prescription={prescription}
                            onClick={() => handlePrescriptionInfoModal(prescription)}
                            onEdit={() => handlePrescriptionEditModal(prescription)}
                        />
                    ))
                }
            </div>
            {selectedPrescription && openInfoModal && (
                <PrescriptionInfoModal
                    isOpen={openInfoModal}
                    onClose={() => setInfoModalOpen(false)}
                    loading={infoModalLoading}
                    prescription={selectedPrescription}
                />
            )}
            {selectedPrescription && openEditModal && (
                <PrescriptionEditModal
                    isOpen={openEditModal}
                    onClose={() => setEditModalOpen(false)}
                    loading={editModalLoading}
                    prescription={selectedPrescription}
                />
            )}
        </>
    )
}

export default PrescriptionList
