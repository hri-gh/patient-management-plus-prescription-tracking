// "use client"

import React from 'react'
import { useEffect } from 'react'
import { format } from "date-fns";
import { cookies } from 'next/headers';

import { NextRequest } from 'next/server';
// COMPONENTS
import { PatientClient } from './components/client'
import { PatientColumn } from './components/columns'

// HOOKS
// import { useFetchPatients } from '@/hooks/useFetchPatients'

// STORE
// import { usePatientStore } from '@/store/patient-store'

// TYPES
import { PatientData } from '@/types/patient.interface'

// SERVICES
import { fetchPatients } from '@/services/fetch-patients';
import { GetServerSideProps } from 'next';

const PatientsPage = async (req: NextRequest) => {
  // const cookieStore = cookies();
  // const { data, error, loading, refetch } = useFetchPatients()
  // const { setPatients, patients } = usePatientStore()

  // useEffect(() => {
  //   if (data) {
  //     setPatients(data);
  //   }
  // }, [data]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const token = cookieStore.get('next-auth.session-token')?.value || '';
  // console.log("Token from cookies:", token);
  // console.log("REQUEST", req.cookies.get("token")?.value || "")

  const patients = await fetchPatients()

  const formattedPatients: PatientColumn[] = patients.map((patient: PatientData) => ({
    _id: patient._id,
    name: patient.name,
    mobile: patient.mobile,
    email: patient.email,
    age: patient.age,
    gender: patient.gender,
    place: patient.place,
    prescriptionCount: patient.prescriptionCount,
    // createdAt: format(patient.createdAt, 'MMMM do , yyyy'),
    // updatedAt: format(patient.updatedAt, 'MMMM do , yyyy'),
    createdAt: patient.createdAt,
    updatedAt: patient.updatedAt,
  }))


  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <PatientClient data={formattedPatients} />
        </div>
      </div>
    </>
  )
}

export default PatientsPage
