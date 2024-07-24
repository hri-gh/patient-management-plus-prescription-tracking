import dbConnect from "@/lib/db-connect";
import PatientModel from "@/models/patient.model";
import { Patient } from "@/types/patient.interface";

import { authOptions } from "../auth/[...nextauth]/options";

import { getServerSession } from "next-auth";
import { User } from "next-auth";


// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json(
            { success: false, message: 'Unauthorized' },
            { status: 401 }
        );
    }

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


export async function GET(req: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user

    if (!session || !_user) {
        return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }


    try {


        const patients = await PatientModel.find()
        return Response.json(patients);

        //return Response.json({success: false, message: 'Not authenticated' }, { status: 401 });
    } catch (error) {
        console.log('[PATIENTS_GET]', error);
        return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
};
