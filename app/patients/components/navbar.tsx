"use client"

import React, { useState } from 'react'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { HomeIcon, HospitalIcon, MenuIcon, PlusIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PatientRegisterModal } from '@/components/modals/patient-register-modal';
import { UserNav } from '@/components/user-nav';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddNewPatient = () => {
        setLoading(true)
        setOpen(true)
        setLoading(false)
    };

    return (
        <>
            <PatientRegisterModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false)}
            />
            <header className="flex items-center justify-between h-16 px-4 border-b md:px-6">
                <div className="flex items-center space-x-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <MenuIcon className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="md:hidden">
                            <nav className="grid gap-4 py-6">
                                <Link
                                    href="/"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    prefetch={false}
                                >
                                    <HomeIcon className="h-5 w-5" />
                                    Home
                                </Link>
                                <Link href="/patients" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                                    <HospitalIcon className="h-5 w-5" />
                                    Patients
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    {/* <h1 className="text-xl font-bold">Patients Nav</h1> */}
                    <nav className="hidden space-x-4 md:flex">
                        <Link href="/" className="text-lg font-semibold">
                            Home
                        </Link>
                        <Link href="/patients" className="text-lg font-semibold">
                            Patients
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    {/* <Button variant="default" className="block">
                        Add New Patient
                    </Button> */}
                    <Button onClick={handleAddNewPatient} className="gap-2 font-bold hover:bg-gray-600 border-white">Add New Patient <PlusIcon /></Button>
                    <UserNav />
                    {/* <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar> */}

                </div>
            </header>
        </>
    )
}

export default Navbar
