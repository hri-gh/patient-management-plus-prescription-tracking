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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

import { Combobox } from '@/components/ui/combobox'
import React, { MouseEvent } from "react"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { CirclePlus, CircleCheckBig, Loader2 } from 'lucide-react';
import { useParams } from "next/navigation"
import usePrescriptionCreateModalStore from "@/store/prescription-create-modal-store"
import { usePrescriptionStore } from "@/store/prescription-store"
import { ProgressBar } from "../progress-bar"

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

  // total_amount: z.number({
  //   required_error: "Please enter total amount",
  // }).optional(),

  paid: z.number({
    required_error: "Please enter paid amount",
  }).optional(),

  // due: z.number({
  //   required_error: "Please enter due amount",
  // }).optional(),
})

export function PrescriptionForm() {
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

      if (response?.data.prescription) {
        setSuccess(true)
        addPrescription(response.data?.prescription)
        toast({
          title: 'Success',
          description: response.data.message,
          variant: 'success'
        });
      } else {
        setSuccess(false)
        toast({
          title: "Error",
          description: "Something went wrong",
        })
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
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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

  console.log("LIST:", list)
  // console.log("Amount:", totalAmount)
  // console.log("Paid_Amount:", paidAmount)
  // console.log("Due_Amount:", dueAmount)

  // {
  //   "drug": "paracetamol",
  //     "quantity": "2",
  //       "price": 20
  // }

  //   {
  //     "drugs":[
  //         {
  //         "drugName":"drug-1",
  //         "quantity":10,
  //         "price":2,
  //         }
  //     ],
  //     "payment":{"amount":500, "paid":300, "due":200},
  //     "owner":"667294cca65ecb9d56abc515"
  // }

  // {
  //   "_id": "66729a29a65ecb9d56abc517",
  //   "drugs": [
  //     {
  //         "drugName":"drug-1",
  //         "quantity":10,
  //         "price":2,
  //         "_id":"66729a29a65ecb9d56abc518",
  //     }
  //   ],
  //    "payment": {
  //     "amount": 500,
  //     "paid": 300,
  //     "due": 200,
  //   },
  //   "owner": "667294cca65ecb9d56abc514" ,
  // }


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
            {/* <FormField
              control={form.control}
              name="total_amount"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Total Amount</FormLabel>
                  <Input placeholder="Amount" disabled={true} type="number" {...field}
                    value={Number(amount) || 0}
                  // value={field.value !== undefined ? field.value : ''}
                  // onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                  />
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* PAID AMOUNT FIELD */}

            <div className="flex flex-col">
              <FormLabel>Paid</FormLabel>
              <Input value={paidAmount}
                onChange={(e) => handlePaidAmountChange(Number(e.target.value))}
              />
            </div>
            {/* <FormField
              control={form.control}
              name="paid"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Paid</FormLabel>
                  <Input placeholder="Paid" type="number" {...field}
                    // value={Number(field.value) || 0}
                    value={field.value !== undefined ? field.value : ''}
                    onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                  />
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* DUE AMOUNT FIELD */}
            <div className="flex flex-col">
              <FormLabel>Due</FormLabel>
              <Input value={dueAmount} disabled={true} />
            </div>
            {/* <FormField
              control={form.control}
              name="due"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due</FormLabel>
                  <Input placeholder="Due" type="number" {...field}
                    // value={Number(field.value) || 0}
                    value={field.value !== undefined ? field.value : ''}
                    onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                  />
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />*/}

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
              success ? <><CircleCheckBig className='mr-1' /><p>Added</p> </> : 'Submit'
            )}
            {/* {success && <ProgressBar shape="fill-circular" duration={20} onComplete={() => setSuccess(false)} />} */}
          </Button>
          <br />
          {success && <ProgressBar shape="line" duration={5} onComplete={() => setSuccess(false)} />}

          {/* <Button onClick={(e: MouseEvent) => {
            e.preventDefault()
            handleSubmit()
          }}
            className="my-5 h-10 gap-1">
            Submit
          </Button> */}
        </form>
      </Form>

      <Separator />
      {/* table, th td */}
      <table className="m-2 border-4 border-black">
        <thead className="">
          <tr className="">
            <th className="border-2">Drug</th>
            <th className="border-2">Quantity</th>
            <th className="border-2">Price</th>
          </tr>
        </thead>
        <tbody >
          {list.map((item, index) => (
            <tr key={index}>
              <td className="border-2"> {item.drugName}</td>
              <td className="border-2"> {item.quantity}</td>
              <td className="border-2"> {item.price}</td>
              <Delete />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
