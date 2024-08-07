"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Delete } from "lucide-react"
import axios, { AxiosError } from "axios"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ApiResponse } from "@/types/api-response"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ScrollArea } from "../ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Combobox } from '@/components/ui/combobox'
import React, { MouseEvent } from "react"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { CirclePlus, CircleCheckBig, Loader2, CircleX, Trash } from 'lucide-react';
import { useParams } from "next/navigation"
import usePrescriptionCreateModalStore from "@/store/prescription-create-modal-store"
import { usePrescriptionStore } from "@/store/prescription-store"
import { ProgressBar } from "../progress-bar"
import CustomTooltip from "../tooltip"

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

  price: z.number({
    required_error: "Please select price",
  }),

  paid: z.number({
    required_error: "Please enter paid amount",
  }).optional(),

})

export function PrescriptionCreateForm() {
  const [list, setList] = useState<z.infer<typeof FormSchema>[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [dueAmount, setDueAmount] = useState<number>(0)
  const [paidAmount, setPaidAmount] = useState<number>(0)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);


  const params = useParams()
  const { addPrescription } = usePrescriptionStore()
  const { setOpen } = usePrescriptionCreateModalStore()


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // alert("Hello")

    const data = {
      drugs: list,
      payment: {
        totalAmount: totalAmount,
        paidAmount: paidAmount,
        dueAmount: dueAmount,
      },
    }

    try {
      // Add a delay of 1 second ((1000 milliseconds)) before making the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.post(`/api/patients/${params.patientId}/prescriptions`, data)
      console.log("PRESCRIPTION_FORM_RESPONSE::", response)

      if (response?.data.prescription && response?.status === 201) {
        setSuccess(true)
        addPrescription(response.data?.prescription)
        toast({
          title: 'Success',
          description: response.data.message,
          variant: 'success'
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('Something went wrong while adding prescription');

      toast({
        title: 'Prescription creation failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
    // setOpen(false)
  }



  function onSubmit(data: z.infer<typeof FormSchema>) {
    // setList(list.concat(data))
    // console.log("DATA:", data)
    const updatedList = [...list, data];
    setList(updatedList);

    // Calculate the total sum of the price field
    const totalAmount = updatedList.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(totalAmount);
    setDueAmount(totalAmount - paidAmount); // Update due amount
    // console.log("Whole data:", data)
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  const handleDelete = (index: number) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);

    const totalAmount = updatedList.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(totalAmount);
    setDueAmount(totalAmount - paidAmount); // Update due amount
  };

  const handlePaidAmountChange = (paid: number) => {
    setPaidAmount(paid);
    setDueAmount(totalAmount - paid);
  };

  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <h1 className="text-2xl font-semibold text-center mb-4  text-slate-200">Create Prescriptions</h1>
          <div className=" flex gap-2 my-2">

            {/* TOTAL AMOUNT FIELD */}
            <div className="flex flex-col">
              <FormLabel>Total Amount</FormLabel>
              <Input value={totalAmount} disabled={true} />
            </div>

            {/* PAID AMOUNT FIELD */}

            <div className="flex flex-col">
              <FormLabel>Paid</FormLabel>
              <Input value={paidAmount}
                onChange={(e) => handlePaidAmountChange(Number(e.target.value))}
              />
            </div>

            {/* DUE AMOUNT FIELD */}
            <div className="flex flex-col">
              <FormLabel>Due</FormLabel>
              <Input value={dueAmount} disabled={true} />
            </div>

          </div>

          {/* DRUG FIELD */}
          <div className=" flex flex-wrap gap-2 my-2">
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

            {/* PRICE FIELD */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Price</FormLabel>
                  <Input placeholder="Price" type="number" {...field}
                    // value={Number(field.value) || 0}
                    value={field.value !== undefined ? field.value : ''}
                    onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                  />
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap mb-4">
            <Button type="submit" className=" gap-1 ">
              <CirclePlus className="w-4" />Add
            </Button>
          </div>
        </form>
      </Form>
      <Separator className="flex"/>

      <div>
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead>Drug</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item, index) => (
              <TableRow key={index}>

                <TableCell>{item.drugName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="" >
                  <CustomTooltip content="Remove drug">
                    <Delete
                      onClick={() => handleDelete(index)}
                      className="cursor-pointer text-red-400 hover:text-red-500"
                    />
                  </CustomTooltip>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        disabled={isSubmitting}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault()
          handleSubmit()
        }}
        className={`my-5 h-10 gap-1 ${success && 'bg-green-500'}`}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          success ? <><CircleCheckBig className='mr-1' /><p>Added</p> </> : 'Submit'
        )}
        {/* {success && <ProgressBar shape="fill-circular" duration={20} onComplete={() => setSuccess(false)} />} */}
      </Button>
      <br />
      {success && <ProgressBar shape="line" duration={5} onComplete={() => setSuccess(false)} />}
    </>
  )
}
