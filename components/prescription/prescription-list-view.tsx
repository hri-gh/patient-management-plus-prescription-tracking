import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Printer, SquarePen, Trash2, Eye, EyeOff } from "lucide-react";
import { Prescription } from '@/store/prescription-store';

interface Props {
    prescription: Prescription;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const PrescriptionListView: React.FC<Props> = ({ prescription, onClick, onEdit, onDelete }) => {
    const [showFullId, setShowFullId] = React.useState(false);

    const toggleIdVisibility = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowFullId(!showFullId);
    };

    const isoDate = prescription.createdAt;
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <div className="cursor-pointer shadow-sm hover:border-gray-400 rounded-lg w-full border-2 p-2 m-2 flex flex-col" onClick={onClick}>
            <div className="">
                <div className="grid gap-1">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Id: {showFullId ? prescription._id : `${prescription._id.slice(0, 6)}...${prescription._id.slice(-4)}`}</span>
                        <Button
                            onClick={toggleIdVisibility}
                            variant="outline" size="icon" className="h-6 w-6"
                        >
                            {showFullId ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showFullId ? 'Hide ID' : 'Show ID'}</span>
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Created: {formattedDate}</span>
                    </div>
                </div>
                <div className="flex flex-col mt-2">
                    <div className="flex items-center space-x-6">
                        <span className="text-muted-foreground">Total</span>
                        <span>₹{prescription.payment.totalAmount}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <span className="text-muted-foreground">Paid</span>
                        <span>₹{prescription.payment.paidAmount}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <span className="text-muted-foreground">Due</span>
                        <span>₹{prescription.payment.dueAmount}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                    }}
                    variant="outline" size="icon" className="h-8 w-8"
                >
                    <Printer className="h-4 w-4" />
                    <span className="sr-only">Print</span>
                </Button>
                <Button
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                    }}
                    variant="outline" size="icon" className="h-8 w-8"
                >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                </Button>
                <Button
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    variant="outline" size="icon" className="h-8 w-8"
                >
                    <SquarePen className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
                <Button
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    variant="outline" size="icon" className="h-8 w-8"
                >
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Delete</span>
                </Button>
            </div>
        </div>
    );
};

export default PrescriptionListView;
