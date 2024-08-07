import { usePrescriptionStore } from "@/store/prescription-store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function FilterPrescriptionsByPaymentStatus() {
    const { filterPaymentStatus, setFilterPaymentStatus } = usePrescriptionStore();

    return (
        <Select
            onValueChange={(value:any) => setFilterPaymentStatus(value)}
            defaultValue="All"
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Due">Due</SelectItem>
            </SelectContent>
        </Select>
    );
}
