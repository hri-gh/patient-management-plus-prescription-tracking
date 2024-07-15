"use client"

import { useState } from "react";
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
import { ToastAction } from "@radix-ui/react-toast";

interface CellActionProps {
    data: PatientColumn;
}


export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    const { toast } = useToast()

    const { deletePatient: deletePatientFromStore } = usePatientStore();

    const [open, setOpen] = useState(false);

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

        try {
            const response = await deletePatient("");

            if (!error) {
                toast({
                    title: 'Patient Deleted',
                    description: response?.message,
                    variant: 'success',
                });
                deletePatientFromStore(response.deletedPatient._id);
                setOpen(false);
            }
        } catch (err) {
            console.log("[CELL_ACTION_ERROR_1]::", err);
        }

        if (error) {
            const errorMessage = error.message || 'Error while deletingPPP. Please try again.';

            toast({
                title: 'Deletion failed',
                description: errorMessage,
                variant: 'destructive',
            });
        }

        // setOpen(false);

    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
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
                        onClick={() => router.push(`/${params.storeId}/billboards/${data._id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </>
    )
}
