import { usePrescriptionStore } from "@/store/prescription-store";

import React from 'react'
import { Button } from "@/components/ui/button";

const ResetPrescriptions = () => {
    const resetFilters = usePrescriptionStore(state => state.resetFilters);

    return (
        <>
            <Button onClick={resetFilters}>Reset Filters</Button>
        </>
    )
}

export default ResetPrescriptions
