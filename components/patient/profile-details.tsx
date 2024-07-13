/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cpVZrEID73C
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ProfileDetails() {
    return (
        <Card className="bg-gray-200 w-full max-w-xs float-start max-h-lvh mx-auto p-6 sm:p-8">
            <CardHeader className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>View and update your personal information.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-1">
                    <Label htmlFor="name">Name</Label>
                    <div className="text-muted-foreground">John Doe</div>
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="mobile">Mobile</Label>
                    <div className="text-muted-foreground">(123) 456-7890</div>
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="age">Age</Label>
                    <div className="text-muted-foreground">35</div>
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <div className="text-muted-foreground">john.doe@example.com</div>
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="gender">Gender</Label>
                    <div className="text-muted-foreground">Male</div>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Edit Profile</Button>
            </CardFooter>
        </Card>
    )
}
