"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PatientColumn = {
    _id: string;
    name: string;
    mobile:number,
    place:string,
    // createdAt: string;
}

export const columns: ColumnDef<PatientColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    // {
    //     accessorKey: "createdAt",
    //     header: "Date",
    // },
    {
        accessorKey: "mobile",
        header: "Mobile",
    },
    {
        accessorKey: "place",
        header: "Place",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} /> // This 'row' is not related to ShadcnUI, it's related to tanstack/react-table
    }
]
