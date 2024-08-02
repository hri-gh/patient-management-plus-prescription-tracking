'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { Home, Hospital, User, ClipboardPlus } from "lucide-react";
import { Button } from '@/components/ui/button';
import AllPatientsList from '../all-patients-side-nav/all-patients-list';
import { useParams } from 'next/navigation';



export default function NavLinks() {
    const params = useParams()
    const pathname = usePathname();

    const links = [
        { id: 1, name: 'Prescriptions', href: `/patients/${params.patientId}/prescriptions`, icon: ClipboardPlus, },
        { id: 0, name: 'Profile', href: `/patients/${params.patientId}`, icon: User, },
    ];
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <>
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                // For hidden in mobile device :: hidden md:flex
                                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-300 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                                {
                                    'bg-sky-200 text-blue-600': pathname === link.href,
                                },
                            )}
                        >
                            <LinkIcon className="w-6 " />
                            <p className=" md:block">{link.name}</p>
                        </Link>

                    </>
                );
            })}
            {/* <div
                className={clsx(
                    // For hidden in mobile device :: hidden md:flex
                    "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                )}>
                <p>All Patients</p>
            </div> */}
            {/* <AllPatientsList /> */}


        </>
    );
}
