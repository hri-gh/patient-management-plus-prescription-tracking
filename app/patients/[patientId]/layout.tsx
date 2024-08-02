import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import Navbar from './components/navigation/navbar'
import SideNav from './components/navigation/side-nav'
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
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className=" w-full flex-none md:w-64">
                    <SideNav />
                </div>
                {/* md:p-12 changed to md:p-5 */}
                <div className="flex-grow p-6 md:overflow-y-auto md:py-5 md:px-12 ">{children}</div>
            </div>
        </>
    );
}
