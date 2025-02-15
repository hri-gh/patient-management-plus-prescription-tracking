import React from 'react'
import { Prescription } from '@/store/prescription-store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Download, Printer, SquarePen, Trash, Trash2, IndianRupee } from "lucide-react"
import html2pdf from 'html2pdf.js'
import { useState } from "react";

const PrescriptionInfoCard = ({ prescription }: { prescription: Prescription }) => {

    const handlePrintPrescription = (e: React.MouseEvent) => {
        e.stopPropagation()
        // Handle print
        const pdfContent = document.getElementById('pdf-content');
        if (pdfContent) {
            // document.getElementById('print-pdf')?.addEventListener('click', () => {
            window.print()
            // });
        }
    }

    const handleDownloadPrescription = (e: React.MouseEvent) => {
        e.stopPropagation()
        // Handle download
        const element = document.getElementById('pdf-content');
        if (element) {
            html2pdf().from(element).save('prep.pdf');
        }
    }

    const handleEditPrescription = (e: React.MouseEvent) => {
        e.stopPropagation()
        // Handle delete
    }

    const handleDeletePrescription = (e: React.MouseEvent) => {
        e.stopPropagation()
        // Handle delete
    }
    return (
        <>
            <Card className="w-full max-w-2xl">
                <CardHeader className="bg-muted/50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="grid gap-1">
                            <CardTitle className="text-lg">Prescription #{prescription._id}</CardTitle>
                            {/* <CardDescription className="text-sm text-muted-foreground">Filled on June 23, 2023</CardDescription> */}
                        </div>
                        <Button onClick={handlePrintPrescription} variant="outline" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                        </Button>

                        <Button onClick={handleDownloadPrescription} variant="outline" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                        </Button>

                        <Button onClick={handleEditPrescription} variant="outline" size="icon" className="h-8 w-8">
                            <SquarePen className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>

                        <Button onClick={handleDeletePrescription} variant="outline" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent id='pdf-content' className="p-6">
                    <div className="grid gap-6">
                        <div>
                            <div className="font-semibold">Drugs</div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Drug Name</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {prescription.drugs.map((drug, index) => (
                                        <TableRow key={index} className='text-green-600'>
                                            <TableCell> {drug.drugName}</TableCell>
                                            <TableCell> {drug.quantity}</TableCell>
                                            <TableCell> {drug.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="font-semibold text-blue-500">Owner</div>
                                <div className="text-sm text-blue-600">
                                    <div>Liam Johnson</div>
                                    <div>123 Main St.</div>
                                    <div>Anytown, CA 12345</div>
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-blue-500">Timestamps</div>
                                <div className="text-sm text-muted-foreground ">
                                    <div className='text-blue-600'>Created: June 23, 2023</div>
                                    <div className='text-blue-600'>Updated: June 25, 2023</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-red-500">Payment</div>
                            <div className="grid gap-2 text">
                                <div className="flex items-center justify-between">
                                    <div className="text-muted-foreground">Total Amount:</div>
                                    <div className='text-red-500'>₹{prescription.payment.totalAmount}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-muted-foreground">Paid Amount:</div>
                                    <div className='text-red-500'>₹{prescription.payment.paidAmount}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-muted-foreground">Due Amount:</div>
                                    <div className='text-red-500'>₹{prescription.payment.dueAmount}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default PrescriptionInfoCard
