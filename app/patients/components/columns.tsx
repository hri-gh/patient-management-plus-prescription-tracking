"use client"

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox"
import PrescriptionCreateSheet from "@/components/sheets/prescriptions/prescription-create-sheet";
import RowAction from "./row-action";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PatientColumn = {
    _id: string;
    name: string;
    mobile: number,
    email: string,
    age: number,
    gender: 'male' | 'female' | 'other',
    place: string,
    prescriptionCount: number
    createdAt: Date;
    updatedAt: Date;
}

export const columns: ColumnDef<PatientColumn>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <RowAction data={row.original} />
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
        cell: ({ row }) => (
            <ToggleMobileNumberVisibility mobile={row.original.mobile.toString()} />
        )
    },
    {
        accessorKey: "place",
        header: "Place",
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            const date = (row.getValue("createdAt") as Date)
            const formattedDate = format(date, 'MMMM do , yyyy');
            return formattedDate;
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => {
            const date = (row.getValue("updatedAt") as Date)
            const formattedDate = format(date, 'MMMM do , yyyy');
            return formattedDate;
        }
    },
    {
        accessorKey: "prescriptionCount",
        header: "Prescriptions",
        cell: ({ row }) => {
            const count = (row.getValue("prescriptionCount") as number)
            return <p className="ml-6">{count}</p>;
        }
    },
    {
        id: "actions",
        cell: ({ row }) => (
            // <div className="relative group">
            //     <Plus className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            // </div>
            <PrescriptionCreateSheet patientId={row.original._id} />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} /> // This 'row' is not related to ShadcnUI, it's related to tanstack/react-table
    }
]


const ToggleMobileNumberVisibility = ({ mobile }: { mobile: string }) => {
    const [showFullId, setShowFullId] = useState(false);

    const toggleIdVisibility = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowFullId(!showFullId);
    };

    return (
        <div className="flex items-centers justify-between">
            <p>
                {showFullId ? mobile : `${mobile.slice(0, 3)}...${mobile.slice(-4)}`}
            </p>
            <Button
                onClick={toggleIdVisibility}
                variant="outline" size="icon" className="h-6 w-6"
            >
                {showFullId ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showFullId ? 'Hide ID' : 'Show ID'}</span>
            </Button>
        </div>
    )
}
