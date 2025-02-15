"use client"

import React, { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { CalendarIcon, CreditCardIcon, DollarSignIcon, EditIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PatientBio from './patient-bio'
import PaymentSummaryCards from './patient-dashboard/payment-summary-cards'
import PatientVisitsBarChart from './patient-dashboard/patient-visits-bar-chart'
import PaymentsTable from './patient-dashboard/payments-table'


// Mock data generator function
const generateYearData = (year: any) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map(month => ({
        name: month,
        total: Math.floor(Math.random() * 2000) + 500 // Random value between 500 and 2500
    }))
}

const generateVisits = (year: any) => {
    return Array.from({ length: 5 }, (_, i) => ({
        id: `${year}-${String(i + 1).padStart(3, '0')}`,
        totalAmount: Math.floor(Math.random() * 400) + 100,
        dueAmount: Math.floor(Math.random() * 100),
        paidAmount: Math.floor(Math.random() * 300) + 100
    }))
}

export default function PatientDetails() {
    const [selectedYear, setSelectedYear] = useState('2023')
    const [data, setData] = useState(generateYearData(selectedYear))
    const [visits, setVisits] = useState(generateVisits(selectedYear))

    const handleYearChange = (year: any) => {
        setSelectedYear(year)
        setData(generateYearData(year))
        setVisits(generateVisits(year))
    }

    const totalAmount = visits.reduce((sum, visit) => sum + visit.totalAmount, 0)
    const totalDueAmount = visits.reduce((sum, visit) => sum + visit.dueAmount, 0)
    const totalVisits = visits.length

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <Select value={selectedYear} onValueChange={handleYearChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-4">
                {/* Patient Bio */}
                <PatientBio />

                {/* Payment Summary Cards */}
                <PaymentSummaryCards />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Chart */}
                    <PatientVisitsBarChart />

                    {/* Payment Table */}
                    <PaymentsTable />
                </div>
            </div>
        </div>
    )
}
