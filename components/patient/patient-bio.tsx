import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const PatientBio = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap space-x-2">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src="/placeholder.svg" alt="Patient" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className='my-auto'>
                                <h2 className="text-2xl font-semibold">John Doe</h2>
                                <p className="text-muted-foreground">johndoe@example.com | +1 (555) 555-5555</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            Edit
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-muted-foreground">Date of Birth</p>
                            <p>1980-01-01</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Gender</p>
                            <p>Male</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Address</p>
                            <p>123 Main St, Anytown USA</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p>+1 (555) 555-5555</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default PatientBio
