import dbConnect from "@/lib/db-connect";
import PrescriptionModel from "@/models/prescription.model";
import { authenticate } from "@/helpers/auth";

export async function POST(req: Request) {
    await dbConnect();

    try {
        const reqBody = await req.json();
        const { drugs, payment, ownerId } = reqBody;

        if (!ownerId) {
            return Response.json({ success: false, message: 'Patient Id is required', }, { status: 400 });
        }

        const newPrescription = new PrescriptionModel({
            drugs,
            payment,
            ownerId,
        })

        await newPrescription.save();

        return Response.json({ success: true, message: 'Prescription saved successfully.', prescription: newPrescription }, { status: 201 });

    } catch (error) {
        console.error('Error adding new prescription:', error);
        return Response.json({ success: false, message: 'Error registering new patient', }, { status: 500 });
    }
}
