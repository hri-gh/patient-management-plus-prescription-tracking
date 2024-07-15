import dbConnect from "@/lib/db-connect";
import PatientModel from "@/models/patient.model";
import { Patient } from "@/types/patient.interface";
import { auth } from "@/auth";
// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
    await dbConnect();

    try {
        const reqBody: Patient = await req.json();
        const { name, mobile, email, age, gender, place, } = reqBody;

        const existingUser = await PatientModel.findOne({ mobile });

        if (existingUser) {
            return Response.json({ success: false, message: 'Mobile number is already taken', }, { status: 400 })
        }

        const newPatient = new PatientModel({
            name,
            mobile,
            email,
            age,
            gender,
            place,
        })
        await newPatient.save();

        return Response.json({ success: true, message: 'New Patient registered successfully.', patient: newPatient }, { status: 201 });

    } catch (error) {
        console.error('PATIENTS_POST', error);
        return Response.json({ success: false, message: 'Error registering new patient', }, { status: 500 });
    }
}


export const GET = auth(async function GET(req) {
    try {
        if (req.auth) {
            await dbConnect();
            const patients = await PatientModel.find()
            return Response.json(patients);
        }

        return Response.json({ message: 'Not authenticated', success: false }, { status: 401 });
    } catch (error) {
        console.log('[PATIENTS_GET]', error);
        return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
    }
});
