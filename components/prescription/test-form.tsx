"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"

import { Combobox } from '@/components/ui/combobox'
import React, { MouseEvent } from "react"
import { useParams } from "next/navigation"
import { CirclePlus } from "lucide-react"
import { usePrescriptionStore } from "@/store/prescription-store"


const drugs = [
    { label: "Aspirin", value: "aspirin" },
    { label: "Paracetamol", value: "paracetamol" },
    { label: "Ibuprofen", value: "ibuprofen" },
    { label: "Amoxicillin", value: "amoxicillin" },
    { label: "Metformin", value: "metformin" },
    { label: "Lisinopril", value: "lisinopril" },
    { label: "Atorvastatin", value: "atorvastatin" },
    { label: "Omeprazole", value: "omeprazole" },
    { label: "Simvastatin", value: "simvastatin" },
    { label: "Losartan", value: "losartan" }
]

const quantity = [
    { label: "1 Tab", value: "1tab" },
    { label: "2 Tab", value: "2tab" },
    { label: "3 Tab", value: "3tab" },
    { label: "4 Tab", value: "4tab" },
    { label: "5 Tab", value: "5tab" },
    { label: "6 Tab", value: "6tab" },
    { label: "7 Tab", value: "7tab" },
    { label: "8 Tab", value: "8tab" },
    { label: "9 Tab", value: "9tab" },
    { label: "10 Tab", value: "10tab" }
]


const FormSchema = z.object({
    drugName: z.string({
        required_error: "Please select a drug",
    }),

    quantity: z.string({
        required_error: "Please select quantity",
    }),

})

export function TestForm() {


    const params = useParams()
    const { addPrescription } = usePrescriptionStore()



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })







    function onSubmit(data: z.infer<typeof FormSchema>) {
        // setList(list.concat(data))
        console.log("DATA:", data)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="">

                    {/* DRUG FIELD */}
                    <div className=" flex gap-2 my-2">
                        <FormField
                            control={form.control}
                            name="drugName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Drug Name</FormLabel>
                                    <Combobox
                                        options={drugs}
                                        placeholder='Select a drug'
                                        {...field}
                                    />
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* QUANTITY FIELD */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Quantity</FormLabel>
                                    <Combobox
                                        options={quantity}
                                        placeholder='Select quantity'
                                        {...field}
                                    />

                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="my-5 h-10 gap-1">
                            <CirclePlus className="w-4" />Add
                        </Button>
                    </div>

                </form>
            </Form>



        </>
    )
}
