"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Delete } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
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
import React from "react"
import { Separator } from "./separator"


const languages = [
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
]

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];


const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language",
  }),
  framework: z.string({
    required_error: "Please select a  framework",
  }),
})

export function ComboboxForm() {
  const [list, setList] = React.useState<z.infer<typeof FormSchema>[]>([])

  console.log(list)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setList(list.concat(data))
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

  return (
    <>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-2 m-2">

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <Combobox
                  options={languages}
                  placeholder='Select a language...'
                  {...field}
                />
                <FormDescription>

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="framework"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Framework</FormLabel>
                <Combobox
                  options={frameworks}

                  placeholder='Select a framework...'
                  {...field}
                />
                <FormDescription>

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="my-auto">Add</Button>
        </form>
      </Form>

      <Separator />
{/* table, th td */}
      <table className="m-2 border-4 border-black">
        <thead className="">
          <tr className="">
            <th className="border-2">Language</th>
            <th className="border-2">Framework</th>
          </tr>
        </thead>
        <tbody >
          {list.map((item, index) => (
            <tr key={index}>
              <td className="border-2"> {item.language}</td>
              <td className="border-2"> {item.framework}</td>
              <Delete/>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
