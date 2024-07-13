import dbConnect from "@/lib/db-connect";
import PatientModel from "@/models/patient.model";
import { Patient } from "@/types/patient.interface";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const reqBody: Patient = await request.json();
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



export async function GET(request: Request) {
    await dbConnect();

    try {
        const patients = await PatientModel.find()
        return Response.json(patients);
    } catch (error) {
        console.log('[PATIENTS_GET]', error);
        return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
    }
};
