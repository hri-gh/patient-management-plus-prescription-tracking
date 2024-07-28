import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Patient List',
    description: 'Patient List',
}

export default async function PatientLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <h1>Patient Nav</h1>
            {children}
        </>
    );
}
