"ise client"
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Download, Printer, SquarePen, Trash, Trash2, IndianRupee } from "lucide-react"
import { Prescription } from '@/store/prescription-store';
import { PrescriptionInfoModal } from "../modals/prescription-info-modal";
import usePrescriptionInfoModalStore from "@/store/prescription-info-modal-store";


export default function PrescriptionPreviewCard({ prescription }: { prescription: Prescription }) {
    const { open, loading, setLoading, setOpen } = usePrescriptionInfoModalStore()

    const router = useRouter();
    const pathname = usePathname();
    const segments = pathname.split('/');
    const patientId = segments[segments.indexOf('patients') + 1]; // Extract patientId from the URL
    const prescriptionId = segments[segments.indexOf('prescriptions') + 1]; // Extract prescriptionId from the URL
    //const prescriptionId = pathname.split('/').pop(); // Extract the prescription ID from the URL

    console.log("PRESCRIPTION_ID::", prescriptionId)
    console.log("PATIENT_ID::", patientId)
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

    // useEffect(() => {
    //     if (prescriptionId && prescriptionId !== 'prescriptions')
    //         setOpen(true)
    // }, [prescriptionId, setOpen])


    const handlePrescriptionInfoModal = () => {
        setLoading(true);
        setOpen(true)
        const newUrl = `/patients/${patientId}/prescriptions/${prescription._id}`;
        if (window.location.pathname !== newUrl) {
            window.history.pushState(null, '', newUrl);
        }
        setLoading(false)
    }

    const handleClose = () => {
        setOpen(false);
        // router.replace('/patients/6698bc97482edf467f16a29f/prescriptions');
        const newUrl = `/patients/${patientId}/prescriptions`;
        if (window.location.pathname !== newUrl) {
            window.history.pushState(null, '', newUrl);
        }
    };


    return (
        <>
            <PrescriptionInfoModal
                isOpen={open}
                loading={loading}
                onClose={handleClose}
                prescription={prescription}
            />
            <Card className="w-full cursor-pointer" >
                <CardHeader className="flex items-center justify-between bg-muted/50 px-6 py-2">
                    <div className="grid gap-1">
                        <CardTitle className="text-lg font-medium">Id #{prescription._id}</CardTitle>
                        {/* <CardDescription className="text-sm text-muted-foreground">Filled on November 23, 2023</CardDescription> */}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <Printer className="h-4 w-4" />
                            <span className="sr-only">Print</span>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">

                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                        </Button>
                        <Button onClick={handlePrescriptionInfoModal} variant="outline" size="icon" className="h-8 w-8">
                            <SquarePen className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
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
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Total</span>
                                    <span>₹{prescription.payment.totalAmount}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Paid</span>
                                    <span>₹{prescription.payment.paidAmount}</span>
                                </div>
                                <div className="flex items-center justify-between">
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






