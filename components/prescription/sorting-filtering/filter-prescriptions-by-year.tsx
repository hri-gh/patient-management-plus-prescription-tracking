import React from 'react'
import { usePrescriptionStore } from '@/store/prescription-store'
import { Combobox } from '@/components/ui/combobox';

const FilterPrescriptionsByYear = () => {
    const { filterYear, setFilterYear } = usePrescriptionStore();

    const years = [
        { label: '2024', value: '2024' },
        { label: '2023', value: '2023' },
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' },
    ]

    return (
        <>
            <Combobox
                options={years}
                placeholder='Filter by year'
                onChange={(value) => setFilterYear(Number(value))}
                value={filterYear?.toString() ?? ""}
                // value={filterYear || ''}
                // onChange={(e) => setFilterYear(e.target.value ? parseInt(e.target.value) : null)}
            />
        </>
    )
}

export default FilterPrescriptionsByYear
