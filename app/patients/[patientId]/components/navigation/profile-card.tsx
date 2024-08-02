"use client"

import Link from 'next/link';
import Image from 'next/image';

// Fonts Import
// import { lusitana } from '@/components/fonts/fonts';


import { Badge } from '@/components/ui/badge';

// import { ContactModal } from '@/components/modals/contact-modal'
import { useState } from 'react';

// import { MovingBorderButton } from '@/components/custom-ui/moving-border';
import { PatientData } from '@/types/patient.interface';
import { Separator } from '@/components/ui/separator';

export default function ProfileCard({ patient }: { patient: PatientData }) {

    return (
        <div
            className={`flex flex-col justify-center items-center leading-none text-white`}
        >
            {/* <Image
                alt="Profile Picture"
                className="rounded-full mx-auto object-cover"
                height="96"
                src="/pp-pic.jpeg"
                style={{
                    aspectRatio: "96/96",
                    objectFit: "cover",
                }}
                priority
                width="96"
            /> */}

            <div className='text-center'>
                <p className="text-center text-2xl font-bold">{patient.name}</p>
                {/* <Separator /> */}
                <p className="text-sm">
                    <strong>Age: </strong>
                    {patient.age}
                </p>

                <p className="text-sm m-0">
                    <strong>Mobile: </strong>
                    {patient.mobile}
                </p>

                <p className="text-sm m-0">
                    <strong>Email: </strong>
                    {patient.email ? patient.email : "No email"}
                </p>

                <p className="text-sm m-0">
                    <strong>Gender: </strong>
                    {patient.gender}
                </p>

                <p className="text-sm m-0">
                    <strong>Place: </strong>
                    {patient.place}
                </p>

                <p className="text-sm m-0">
                    <strong>CreatedAt: </strong>
                    {"15 Jul, 2023"}
                </p>
            </div>

        </div>
    );
}
