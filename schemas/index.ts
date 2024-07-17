import { z } from "zod";

// *-----------------------*
// Patient Register Schema
// *-----------------------*
import { Patient } from "@/types/patient.interface";

type SchemaShape<T> = {
    [K in keyof T]: z.ZodType<T[K]>;
}

const PatientRegisterSchemaShape: SchemaShape<Patient> = ({
    name: z.string().min(1).max(50),
    email: z.string().email(),
    age: z.number(),
    gender: z.enum(['male', 'female', 'other']),
    mobile: z.number(),
    place: z.string().min(1),
})

export const PatientRegisterSchema = z.object(PatientRegisterSchemaShape)

// *-------------*
// SignIn Schema
// *-------------*
export const SignInSchema = z.object({
    identifier: z.string().min(1),  // We don't know if it is an email or a username yet
    password: z.string().min(1),
});



// *-------------*
// Verify Schema
// *-------------*
export const VerifySchema = z.object({
    code: z.string().length(6, 'OTP must be 6 digits'),
});
