import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Patient List',
    description: 'Patient List',
}

export default async function PatientsLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <Navbar/>
            {children}
        </>
    );
}
