import dbConnect from "@/lib/db-connect";
import PatientModel from "@/models/patient.model";
import { Patient } from "@/types/patient.interface";
import { authenticate } from "@/helpers/auth";
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";
import { getDataFromToken } from "@/helpers/get-data-from-token";

export async function POST(req: NextRequest) {
    await dbConnect();

    const authResult = await authenticate(req)

    if ('status' in authResult) {
        return Response.json(authResult, { status: authResult.status })

    }

    try {
        const reqBody: Patient = await req.json();
        const { name, mobile, email, age, gender, place, } = reqBody;

        // const existingUser = await PatientModel.findOne({ mobile });

        // if (existingUser) {
        //     return Response.json({ success: false, message: 'Mobile number is already taken', }, { status: 400 })
        // }

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


export async function GET(req: NextRequest) {
    await dbConnect();

    const token = req.headers.get('Authorization')?.split(' ')[1] || "";


    // console.log("TOKEN::", token)

    // const userId = getDataFromToken(token)
    // console.log("USER::",userId)


    // const authResult = await authenticate(req)

    // const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    // const { payload } = await jwtVerify(token, secret);

    // console.log("REQ::",req)

    // if ('status' in authResult) {
    //     return Response.json(authResult, { status: authResult.status })

    // }

    try {
        const patients = await PatientModel.aggregate([
            {
                $lookup: {
                    from: 'prescriptions', // Collection name for prescriptions
                    localField: '_id',
                    foreignField: 'ownerId',
                    as: 'prescriptions'
                }
            },
            {
                $addFields: {
                    prescriptionCount: { $size: '$prescriptions' }
                }
            },
            {
                $project: {
                    prescriptions: 0 // Optionally exclude the prescriptions array
                }
            },
        ])
        return Response.json(patients);
    } catch (error) {
        console.log('[PATIENTS_GET]', error);
        return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
};
