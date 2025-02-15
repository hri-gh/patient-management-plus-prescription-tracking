import React, {useState} from 'react'
import { CalendarIcon, CreditCardIcon, DollarSignIcon, EditIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const generateVisits = (year: any) => {
    return Array.from({ length: 5 }, (_, i) => ({
        id: `${year}-${String(i + 1).padStart(3, '0')}`,
        totalAmount: Math.floor(Math.random() * 400) + 100,
        dueAmount: Math.floor(Math.random() * 100),
        paidAmount: Math.floor(Math.random() * 300) + 100
    }))
}

const PaymentsTable = () => {
    const [selectedYear, setSelectedYear] = useState('2023')
    const [visits, setVisits] = useState(generateVisits(selectedYear))
    return (
        <>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Recent Visits</CardTitle>
                    <CardDescription>
                        You have {visits.length} total visits in {selectedYear}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Visit ID</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Due Amount</TableHead>
                                <TableHead>Paid Amount</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visits.map((visit) => (
                                <TableRow key={visit.id}>
                                    <TableCell className="font-medium">{visit.id}</TableCell>
                                    <TableCell>${visit.totalAmount}</TableCell>
                                    <TableCell>${visit.dueAmount}</TableCell>
                                    <TableCell>${visit.paidAmount}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            <EditIcon className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default PaymentsTable
