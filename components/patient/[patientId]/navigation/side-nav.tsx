
// "use client"
import NavLinks from './nav-links';

import ProfileCard from './profile-card';
import AllPatientsList from '../../../../app/patients/[patientId]/components/patients-sidebar';

export default function SideNav() {
  const blue500 = "bg-blue-400"
  return (
    <>
      <div className="lg:hidden md:hidden mt-4 mx-3 float-right">
      </div>

      {/* <div className={`${blue500}`}>Hello</div> */}
      <div className="flex h-full flex-col px-3 py-4 md:px-2 ">

        {/* removed md:h-40 for below div*/}
        <div className="mb-2 p-2 flex h-auto items-center justify-center rounded-md  bg-sky-700">
          <div className="w-32 md:w-40">
            <ProfileCard />
          </div>
        </div>

        <div className="flex flex-wrap grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <div className='mx-auto'>
            <AllPatientsList />
          </div>
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-100 text-black md:block">
          </div>
        </div>
      </div>
    </>
  );
}
