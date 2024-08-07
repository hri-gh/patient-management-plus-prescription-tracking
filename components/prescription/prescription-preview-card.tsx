"ise client"
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Download, Printer, SquarePen, Trash2, Eye, EyeOff } from "lucide-react"
import { Prescription } from '@/store/prescription-store';


interface Props {
    prescription: Prescription;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}


const PrescriptionPreviewCard: React.FC<Props> = ({ prescription, onClick, onEdit, onDelete }) => {
    const [showFullId, setShowFullId] = useState(false);

    const toggleIdVisibility = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowFullId(!showFullId);
    };

    const isoDate = prescription.createdAt
    const date = new Date(isoDate);

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Format the date to a readable string
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <>
            <Card className="cursor-pointer w-full max-w-xs m-2 border-2  hover:shadow-indigo-500"
                onClick={onClick}>
                <CardHeader className="flex items-center justify-between bg-muted/50 px-6 py-2">
                    <div className="grid gap-1">
                        <CardTitle className="text-sm  font-medium ">
                            {showFullId ? prescription._id : `${prescription._id.slice(0, 6)}...${prescription._id.slice(-4)}`}
                        </CardTitle>
                        {/* <CardDescription className="text-sm text-muted-foreground">Filled on November 23, 2023</CardDescription> */}
                    </div>
                    <Button
                        onClick={toggleIdVisibility}
                        variant="outline" size="icon" className="h-6 w-6"
                    >
                        {showFullId ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showFullId ? 'Hide ID' : 'Show ID'}</span>
                    </Button>
                    <div className="flex items-center gap-2">

                        <Button
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation()
                            }}
                            variant="outline" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                        </Button>

                        <Button
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation()
                            }}
                            variant="outline" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                        </Button>

                        <Button
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation()
                                onEdit()
                            }}
                            variant="outline" size="icon" className="h-8 w-8"> <SquarePen className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>

                        <Button
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation()
                                onDelete()
                            }}
                            variant="outline" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                        </Button>

                    </div>
                </CardHeader>
                <CardContent className="py-1 text-sm">
                    <div className="grid gap-1">
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Drug</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {prescription.drugs.slice(0, 2).map((drug, index) => (
                                        <TableRow key={index}>
                                            <TableCell> {drug.drugName}</TableCell>
                                            <TableCell> {drug.quantity}</TableCell>
                                            <TableCell> {drug.price}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>...</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="grid ">
                            <div className="grid gap-1">
                                <div className="flex items-center justify-between flex-wrap">
                                    <span className="text-muted-foreground">Total</span>
                                    <span>₹{prescription.payment.totalAmount}</span>
                                </div>
                                <div className="flex items-center justify-between flex-wrap">
                                    <span className="text-muted-foreground">Paid</span>
                                    <span>₹{prescription.payment.paidAmount}</span>
                                </div>
                                <div className="flex items-center justify-between flex-wrap">
                                    <span className="text-muted-foreground">Due</span>
                                    <span>₹{prescription.payment.dueAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                {/* <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4"> */}
                <CardFooter className="grid gap-1 bg-muted/50 px-5 py-2">
                    <div className="flex items-center justify-between ">
                        <span className="text-muted-foreground">Created</span>
                        <span>
                            <time dateTime="2023-11-23">{formattedDate}</time>
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}


export default PrescriptionPreviewCard
