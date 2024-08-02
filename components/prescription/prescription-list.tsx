import React, { useState } from 'react'
import PrescriptionPreviewCard from './prescription-preview-card'
import { usePrescriptionStore } from '@/store/prescription-store';
import { PrescriptionInfoModal } from "../modals/prescription-info-modal";
import usePrescriptionInfoModalStore from "@/store/prescription-info-modal-store";
import { Prescription } from '@/store/prescription-store';
import usePrescriptionEditModalStore from '@/store/prescription-edit-modal-store';
import { PrescriptionEditModal } from '../modals/prescription-edit-modal';
import { useParams } from "next/navigation"
import { AlertModal } from '../modals/alert-modal';
import { toast } from '../ui/use-toast';
import useDeletePrescription from '@/hooks/useDeletePrescription';

const PrescriptionList = () => {
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | undefined>(undefined);
    const { prescriptions, selectedPrescription, setSelectedPrescription, deletePrescription: deletePrescriptionFromStore } = usePrescriptionStore()

    const { deletePrescription, error, loading } = useDeletePrescription()
    // console.log("Selected Prescription:", selectedPrescription);

    const { open: openInfoModal, loading: infoModalLoading, setLoading: setInfoModalLoading, setOpen: setInfoModalOpen } = usePrescriptionInfoModalStore()
    const { open: openEditModal, loading: editModalLoading, setLoading: setEditModalLoading, setOpen: setEditModalOpen } = usePrescriptionEditModalStore()
    const [openAlertModal, setAlertModalOpen] = useState(false);

    const params = useParams()


    const handlePrescriptionInfoModal = (prescription: Prescription) => {
        // console.log("Selected Prescription_INFO:", prescription);
        setSelectedPrescription(prescription);
        setInfoModalOpen(true);
    }

    const handlePrescriptionEditModal = (prescription: Prescription) => {
        // console.log("Selected Prescription_EDIT:", prescription);

        setSelectedPrescription(prescription)
        setEditModalOpen(true)
    }

    const handlePrescriptionDelete = (prescriptionId: string) => {
        // console.log("Selected Prescription_DELETE:", selectedPrescription);
        setAlertModalOpen(true)
        // console.log(typeof (params.patientId))
        setSelectedPrescriptionId(prescriptionId)
    }

    const onConfirmPrescriptionDelete = async () => {
        const patientId = params.patientId.toString();
        // const prescriptionId = selectedPrescriptionId?.toString() || "";
        const response = await deletePrescription(patientId, selectedPrescriptionId ?? "")
        // console.log("Prescription_DELETE_Response:", response);
        if (response?.data.deletedPrescription && response.status === 200) {
            toast({
                title: 'Prescription Deleted',
                description: response?.data.message,
                variant: 'success',
            });
            deletePrescriptionFromStore(response.data.deletedPrescription._id)
            setAlertModalOpen(false)
        } else {
            toast({
                title: 'Deletion failed',
                description: error?.message,
                variant: 'destructive',
            });
            setAlertModalOpen(false);
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    prescriptions.map((prescription: Prescription) => (
                        <PrescriptionPreviewCard
                            key={prescription._id}
                            prescription={prescription}
                            onClick={() => handlePrescriptionInfoModal(prescription)}
                            onEdit={() => handlePrescriptionEditModal(prescription)}
                            onDelete={() => handlePrescriptionDelete(prescription._id)}
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

            <AlertModal
                isOpen={openAlertModal}
                onClose={() => setAlertModalOpen(false)}
                onConfirm={onConfirmPrescriptionDelete}
                loading={loading}
            />
        </>
    )
}


export default PrescriptionList
