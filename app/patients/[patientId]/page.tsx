'use client'

import React from 'react'
import { Combobox } from '@/components/ui/combobox'
import { ComboboxForm } from '@/components/ui/combobox-form';
import { ProfileDetails } from '@/components/patient/profile-details';


const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

const Patient = ({ params }: { params: { patientId: string } }) => {
    // const [selectedFramework, setSelectedFramework] = React.useState('');
    return (
        <div>


            {/* <ProfileDetails /> */}

            {/* <h1>Patient {params.patientId}</h1> */}
            {/*
            <Combobox
                options={frameworks}
                value={selectedFramework}
                onChange={(value) => setSelectedFramework(value)}
                placeholder='Select a framework...'
            /> */}

            <ComboboxForm />
        </div>
    )
}

export default Patient


