import dbConnect from "@/lib/db-connect";
import PatientModel from "@/models/patient.model";
import { Patient } from "@/types/patient.interface";
import { authenticate } from "@/helpers/auth";


export async function POST(req: Request) {
    await dbConnect();

    const authResult = await authenticate(req)
    if ('status' in authResult) {
        return Response.json(authResult, { status: authResult.status })

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

    const authResult = await authenticate(req)
    if ('status' in authResult) {
        return Response.json(authResult, { status: authResult.status })

    }

    try {
        const patients = await PatientModel.find()
        return Response.json(patients);
    } catch (error) {
        console.log('[PATIENTS_GET]', error);
        return Response.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
};
