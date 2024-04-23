import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Individual Patient',
    description: 'Individual Patient',
}

export default async function PatientLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            {children}
        </>
    );
}
