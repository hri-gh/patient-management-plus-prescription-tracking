"use client"

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
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
import { PatientData } from "@/types/patient.interface";

interface CellActionProps {
    data: PatientColumn;
}


export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAlertModal, setOpenAlertModal] = useState(false);
    // const [loading:eLoading, setLoading] = useState(false);

    const router = useRouter()
    const params = useParams()
    const { toast } = useToast()

    const { deletePatient: deletePatientFromStore } = usePatientStore();

    const { deletePatient, error, loading } = useDeletePatient()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({
            title: 'Patient Id copied to clipboard.',
            description: `Id: ${id}`,
            variant: 'success',
        });
    }

    const onConfirm = async () => {
        const response = await deletePatient(data._id);

        if (response?.data.deletedPatient) {
            toast({
                title: 'Patient Deleted',
                description: response?.data.message,
                variant: 'success',
            });
            deletePatientFromStore(response.data.deletedPatient._id);

            setOpenAlertModal(false);
        } else {
            toast({
                title: 'Deletion failed',
                description: error?.message,
                variant: 'destructive',
            });

            setOpenAlertModal(false);
        }
    };


    return (
        <>
            <PatientEditModal
                isOpen={openEditModal}
                loading={loading}
                onClose={() => setOpenEditModal(false)}
                patient={data}
            />
            <AlertModal
                isOpen={openAlertModal}
                onClose={() => setOpenAlertModal(false)}
                onConfirm={onConfirm}
                loading={loading}
            />


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
                        onClick={() => onCopy(data._id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        // onClick={() => router.push(`/patients/${data._id}/edit`)}
                        onClick={() => setOpenEditModal(true)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpenAlertModal(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </>
    )
}
