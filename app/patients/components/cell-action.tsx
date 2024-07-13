"use client"

import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";


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


interface CellActionProps {
    data: PatientColumn;
}


export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()
    const { toast } = useToast()

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        // toast.success('Billboard Id copied to clipboard.');
        toast({
            title: 'Patient Id copied to clipboard.',
            // description: errorMessage,
            variant: 'default',
        });
    }

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${data._id}`);
            toast({
                title: 'Patient Deleted',
                // description: errorMessage,
                variant: 'default',
            });
            router.refresh();
        } catch (error) {
            // toast.error('Make sure you removed all categories using this billboard first.');
            toast({
                title: 'Default message',
                // description: error.data.message,
                variant: 'default',
            });
        } finally {
            setOpen(false);
            setLoading(false);
        }
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
