"use client"

import React from 'react'
import { useEffect } from 'react'
import { format } from "date-fns";

// COMPONENTS
import { PatientClient } from './components/client'
import { PatientColumn } from './components/columns'

// HOOKS
import { useFetchPatients } from '@/hooks/useFetchPatients'

// STORE
import { usePatientStore } from '@/store/patient-store'

// TYPES
import { PatientData } from '@/types/patient.interface'


const PatientsPage = () => {
  const { data, error, loading, refetch } = useFetchPatients()

  const { setPatients, patients } = usePatientStore()

  useEffect(() => {
    if (data) {
      setPatients(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formattedPatients: PatientColumn[] = patients.map((patient: PatientData) => ({
    _id: patient._id,
    name: patient.name,
    mobile: patient.mobile,
    email: patient.email,
    age: patient.age,
    gender: patient.gender,
    place: patient.place,
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
