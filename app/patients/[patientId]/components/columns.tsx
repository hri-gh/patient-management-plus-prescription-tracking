"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "@/app/patients/components/cell-action";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";

import RowAction from "@/app/patients/components/row-action";

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
    createdAt: Date;
    updatedAt: Date;
}

export const columns: ColumnDef<PatientColumn>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    // },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <RowAction data={row.original} />
    },
    // {
    //     accessorKey: "mobile",
    //     header: "Mobile",
    // },
    // {
    //     accessorKey: "place",
    //     header: "Place",
    // },
    // {
    //     accessorKey: "createdAt",
    //     header: "Created",
    //     cell: ({ row }) => {
    //         const date = (row.getValue("createdAt") as Date)
    //         const formattedDate = format(date, 'MMMM do , yyyy');
    //         return formattedDate;
    //     }
    // },
    // {
    //     accessorKey: "updatedAt",
    //     header: "Updated",
    //     cell: ({ row }) => {
    //         const date = (row.getValue("updatedAt") as Date)
    //         const formattedDate = format(date, 'MMMM do , yyyy');
    //         return formattedDate;
    //     }
    // },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} /> // This 'row' is not related to ShadcnUI, it's related to tanstack/react-table
    }
]
