import React, { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { CalendarIcon, CreditCardIcon, DollarSignIcon, EditIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Mock data generator function
const generateYearData = (year: any) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map(month => ({
        name: month,
        total: Math.floor(Math.random() * 2000) + 500 // Random value between 500 and 2500
    }))
}

const PatientVisitsBarChart = () => {
    const [selectedYear, setSelectedYear] = useState('2023')
    const [data, setData] = useState(generateYearData(selectedYear))


    return (
        <>
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Monthly Overview for {selectedYear}</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </>
    )
}

export default PatientVisitsBarChart
