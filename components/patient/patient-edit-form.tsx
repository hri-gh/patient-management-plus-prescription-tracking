"use client"

import React from 'react'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/api-response';
import { CircleCheckBig } from 'lucide-react';

// COMPONENTS IMPORT
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"
import { ProgressBar } from '../progress-bar';


// SCHEMAS IMPORT
import { PatientRegisterSchema } from '@/schemas';

import { usePatientStore } from '@/store/patient-store';

// ICONS IMPORT
import { Loader2 } from 'lucide-react'

import { PatientData } from '@/types/patient.interface';

interface PatientsEditFormProps {
    patient: PatientData
}


export const PatientEditForm: React.FC<PatientsEditFormProps> = ({ patient }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const { editPatient } = usePatientStore()
    const { toast } = useToast()
    const router = useRouter();

    const form = useForm<z.infer<typeof PatientRegisterSchema>>({
        resolver: zodResolver(PatientRegisterSchema),
        defaultValues: patient
    })

    const onSubmit = async (data: z.infer<typeof PatientRegisterSchema>) => {
        setIsSubmitting(true);
        try {

            // Add a delay of 1 second ((1000 milliseconds)) before making the API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.patch(`/api/patients/${patient._id}`, data)

            // console.log("[EDIT_FORM]::", data)
            if (response?.data.updatedPatient && response.status === 200) {

                setSuccess(true)

                const _id = response.data?.updatedPatient._id
                const updatedPatient = response.data?.updatedPatient
                editPatient(_id, updatedPatient)
                toast({
                    title: 'Success',
                    description: response.data.message,
                    variant: 'success'
                });

                router.push('/patients')
            }

        } catch (error) {
            console.error('Error during registering new patient:', error);

            const axiosError = error as AxiosError<ApiResponse>;

            // Default error message
            let errorMessage = axiosError.response?.data.message;
            ('There was a problem with your request. Please try again.');

            toast({
                title: 'Register Failed',
                description: errorMessage,
                variant: 'destructive',
            });

            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            {/* <div className="flex justify-center"> */}
            {/* <div className="w-full  p-8 space-y-8 bg-gray-200 rounded-lg shadow-md"> */}

            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Edit patient details
                </h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-2">

                    {/* NAME */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="John Doe"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EMAIL */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="example@email.com"
                                        type="email"

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* AGE */}
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient Age</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="99"
                                        type='number'
                                        // value={Number(field.value)}
                                        // value={field.value !== undefined ? field.value : ''}
                                        value={field.value !== undefined && field.value !== null ? field.value : ''}
                                        // onChange={(e) => field.onChange(Number(e.target.value))}
                                        onChange={(e) => {
                                            const newValue = e.target.value === '' ? null : Number(e.target.value);
                                            field.onChange(newValue);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* GENDER */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="other">Other</SelectItem>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* MOBILE */}
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="99999 99999"
                                        // type='number'
                                        maxLength={10}
                                        // value={Number(field.value) || 0}
                                        // value={field.value !== undefined ? field.value : ''}
                                        // onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                                        value={field.value !== undefined && field.value !== null ? field.value : ''}
                                        onChange={(e) => {
                                            const newValue = e.target.value === '' ? null : Number(e.target.value);
                                            field.onChange(newValue);
                                        }}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PLACE */}
                    <FormField
                        control={form.control}
                        name="place"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Place</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Address"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting} className={`w-full mt-2 ${success && 'bg-green-500'}`}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            success ? <><CircleCheckBig className='mr-1' /><p>Updated</p> </> : 'Update'
                        )}
                        {/* {success && <ProgressBar shape="fill-circular" duration={20} onComplete={() => setSuccess(false)} />} */}
                    </Button>
                    <br />
                    {success && <ProgressBar shape="line" duration={5} onComplete={() => setSuccess(false)} />}
                </form>
            </Form>


            {/* </div> */}
            {/* </div> */}
        </>
    )
}




















