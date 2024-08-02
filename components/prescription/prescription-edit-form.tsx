import React, { useEffect } from 'react'
import { Prescription } from '@/store/prescription-store'
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

import { toast } from "@/components/ui/use-toast"

import { Combobox } from '@/components/ui/combobox'
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
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" }
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
})


const PrescriptionEditForm = ({ prescription }: { prescription: Prescription }) => {
  const [list, setList] = useState<z.infer<typeof FormSchema>[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [dueAmount, setDueAmount] = useState<number>(0)
  const [paidAmount, setPaidAmount] = useState<number>(0)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const params = useParams()
  const { editPrescription } = usePrescriptionStore()

  useEffect(() => {
    setList(prescription.drugs)
    setTotalAmount(prescription.payment.totalAmount)
    setDueAmount(prescription.payment.dueAmount)
    setPaidAmount(prescription.payment.paidAmount)
  }, [])


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const handleSubmit = async () => {
    // console.log(params.patientId)
    // console.log(prescription._id)

    setIsSubmitting(true);
    const data = {
      drugs: list,
      payment: {
        totalAmount: totalAmount,
        paidAmount: paidAmount,
        dueAmount: dueAmount,
      },
    }

    // console.log("Submit::", data)

    try {
      // Add a delay of 1 second ((1000 milliseconds)) before making the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axios.patch(`/api/patients/${params.patientId}/prescriptions/${prescription._id}`, data)
      // console.log("PRESCRIPTION_EDIT_FORM_RESPONSE::", response)

      if (response?.data.updatedPrescription && response?.status === 200) {
        setSuccess(true)
        editPrescription(response.data?.updatedPrescription._id, response.data?.updatedPrescription)
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
      ('Something went wrong while updating prescription');

      toast({
        title: 'Prescription updation failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  function onSubmit(data: z.infer<typeof FormSchema>) {
    // setList(list.concat(data))
    console.log("DATA:", data)
    const updatedList = [data, ...list];
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


  const handlePaidAmountChange = (paid: number) => {
    setPaidAmount(paid);
    setDueAmount(totalAmount - paid);
  };

  const handleDelete = (index: number) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);

    const totalAmount = updatedList.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(totalAmount);
    setDueAmount(totalAmount - paidAmount); // Update due amount
  };

  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
            <Button type="submit" className="my-5 h-10 gap-1">
              <CirclePlus className="w-4" />Add
            </Button>
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
              success ? <><CircleCheckBig className='mr-1' /><p>Updated</p> </> : 'Update'
            )}
            {/* {success && <ProgressBar shape="fill-circular" duration={20} onComplete={() => setSuccess(false)} />} */}
          </Button>
          <br />
          {success && <ProgressBar shape="line" duration={5} onComplete={() => setSuccess(false)} />}
        </form>
      </Form>
      <Separator />
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
    </>
  )
}

export default PrescriptionEditForm
