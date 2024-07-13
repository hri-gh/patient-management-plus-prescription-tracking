"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

interface IModalProps {
    title: string;
    description: string;
    modalClass?: string
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<IModalProps> = ({ title, description, modalClass, isOpen, onClose, children }) => {

const onChange = (open: boolean) => {
    if (!open) {
        onClose();
    }
};

return (
    <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className={modalClass}>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div>
                {children}
            </div>
        </DialogContent>
    </Dialog>
)
}
