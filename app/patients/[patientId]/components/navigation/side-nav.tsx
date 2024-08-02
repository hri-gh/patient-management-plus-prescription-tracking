
"use client"

import Link from 'next/link';
import NavLinks from './nav-links';
import { useFetchPatient } from '@/hooks/useFetchPatient';
import ProfileCard from './profile-card';
import AllPatientsList from '../all-patients-side-nav/all-patients-list';
// import { ThemeToggle } from '@/components/theme-toggle';
// import { MobileSideNav } from './mobile-side-nav';
import { Button } from '@/components/ui/button';
// import { ContactInfo } from '../contacts/contact-info';
import { useParams } from 'next/navigation';

export default function SideNav() {

  const params = useParams()
  // console.log(params.patientId)

  const blue500 = "bg-blue-400"
  const { data, error, loading, refetch } = useFetchPatient(params.patientId.toString())

  return (
    <>
      {/* <MobileSideNav /> */}
      <div className="lg:hidden md:hidden mt-4 mx-3 float-right">
        {/* <ThemeToggle /> */}
      </div>

      {/* <div className={`${blue500}`}>Hello</div> */}
      <div className="flex h-full flex-col px-3 py-4 md:px-2 ">

        {/* removed md:h-40 for below div*/}
        <div className="mb-2 p-2  flex h-auto items-center justify-center rounded-md bg-yellow-500 ">
          <div className="w-32 text-white md:w-40">
            {loading && "Loading..."}
            {data && <ProfileCard patient={data} />}
          </div>
        </div>

        <AllPatientsList/>

        <div className="flex flex-wrap grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-100 text-black md:block">
            {/* <header className='text-center'>Contact</header> */}
            {/* <ContactInfo /> */}

          </div>

          {/* <div className='hidden md:flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'> */}
          {/* <ThemeToggle /> */}
          {/* <div className="hidden md:block text-black">Toggle Theme</div>
          </div> */}

        </div>
      </div>
    </>
  );
}
