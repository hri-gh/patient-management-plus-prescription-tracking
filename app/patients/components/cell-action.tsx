"use client"

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash, User, CopyIcon, IndianRupee, Plus } from "lucide-react";
import { ApiResponse } from "@/types/api-response";

import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { PatientColumn } from "./columns";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import useDeletePatient from "@/hooks/useDeletePatient";
import { ifError } from "assert";
import { usePatientStore } from "@/store/patient-store";

import { PatientEditModal } from "@/components/modals/patient-edit-modal";
import { Patient, PatientData } from "@/types/patient.interface";
import usePatientEditModalStore from "@/store/patient-edit-modal-store";
import usePaymentReminder from "@/hooks/usePaymentReminder";
import usePrescriptionCreateModalStore from '@/store/prescription-create-modal-store';
import { PrescriptionCreateModal } from '@/components/modals/prescription-create-modal';


interface CellActionProps {
    data: PatientColumn;
}


export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // const { open: openEditModal, loading: editModalLoading, setLoading: setEditModalLoaing, setOpen: setEditModalOpen } = usePatientEditModalStore()

    // const [openEditModal, setOpenEditModal] = useState(false);
    // const [openAlertModal, setOpenAlertModal] = useState(false);
    // const [alertModalLoading, setAlertModalLoading] = useState(false);
    // const [loading:eLoading, setLoading] = useState(false);

    const router = useRouter()
    const params = useParams()
    const { toast } = useToast()

    const { deletePatient: deletePatientFromStore, addPatient, setSelectedPatient, selectedPatient } = usePatientStore();
    const { paymentReminder } = usePaymentReminder()
    const { deletePatient, error, loading } = useDeletePatient()
    const { open, loading: modalLoading, setOpen, setLoading } = usePrescriptionCreateModalStore()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({
            title: 'Patient Id copied to clipboard.',
            description: `Id: ${id}`,
            variant: 'success',
        });
    }

    const handleDeletePatient = async () => {
        if (confirm("Are you sure you want to delete this patient? This action cannot be undone.")) {

            const response = await deletePatient(data._id);

            if (response?.data.deletedPatient) {
                toast({
                    title: 'Patient Deleted',
                    description: response?.data.message,
                    variant: 'success',
                });
                deletePatientFromStore(response.data.deletedPatient._id);

            } else {
                toast({
                    title: 'Deletion failed',
                    description: error?.message,
                    variant: 'destructive',
                });
            }
        }
    };

    const handleClonePatient = async () => {
        const { _id, ...rest } = data;
        setIsSubmitting(true);
        try {

            // Add a delay of 1 second ((1000 milliseconds)) before making the API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.post('/api/patients', rest)

            if (response?.data.patient && response.status === 201) {
                setSuccess(true)

                addPatient(response.data?.patient)

                toast({
                    title: 'Success',
                    description: "Patient cloned successfully",
                    variant: 'success'
                });
            }

        } catch (error) {
            console.error('Error during cloning patient:', error);

            const axiosError = error as AxiosError<ApiResponse>;

            // Default error message
            let errorMessage = axiosError.response?.data.message;
            ('Something went wrong. Please try again.');

            toast({
                title: 'Clone Failed',
                description: errorMessage,
                variant: 'destructive',
            });

            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handlePaymentReminder = async (id: string) => {
        const response = await paymentReminder(id)

        if (response?.data.patient && response?.status === 200) {
            toast({
                title: 'Email sent successfully',
                description: response?.data.message,
                variant: 'success',
            });


        } else {
            toast({
                title: 'Failed to sent email',
                description: error?.message,
                variant: 'destructive',
            });
        }
    }

    // const handleEditModal = (patient: PatientData) => {
    //     // console.log("CAPI_1::",patient)
    //     setSelectedPatient(null)
    //     setSelectedPatient(patient)
    //     console.log("CAPI::", selectedPatient)
    //     // setEditModalOpen(true)
    // }

    const handlePrescriptionCreateModal = () => {
        setLoading(true);
        setOpen(true)
        setLoading(false)
    }


    return (
        <>
            <PrescriptionCreateModal
                isOpen={open}
                loading={modalLoading}
                onClose={() => setOpen(false)}
            />
            {/* {selectedPatient && openEditModal && (
                <PatientEditModal
                    isOpen={openEditModal}
                    loading={editModalLoading}
                    onClose={() => setEditModalOpen(false)}
                    patient={selectedPatient}
                />
            )} */}
            {/* <AlertModal
                isOpen={openAlertModal}
                onClose={() => {
                    console.log("Closing alert modal");
                    setOpenAlertModal(false);
                }}
                onConfirm={onConfirm}
                loading={alertModalLoading}
            /> */}


            <DropdownMenu>
                {/* DropdownMenuTrigger */}
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                {/* DropdownMenuContent */}
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        onClick={() => router.push(`/patients/${data._id}`)}
                    >
                        <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => onCopy(data._id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => router.push(`/patients/${data._id}/edit`)}
                    // onClick={() => handleEditModal(data)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        // onClick={() => handleDeletePatient(true)}
                        onClick={() => handlePaymentReminder(data._id)}
                    >
                        <IndianRupee className="mr-2 h-4 w-4" /> Payment Reminder
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        // onClick={() => handleDeletePatient(true)}
                        onClick={handleDeletePatient}
                    >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={handleClonePatient}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Clone
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </>
    )
}
