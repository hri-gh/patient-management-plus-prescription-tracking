import dbConnect from "@/lib/db-connect";
import PrescriptionModel from "@/models/prescription.model";
import { authenticate } from "@/helpers/auth";

export async function POST(
    req: Request,
    { params }: { params: { patientId: string } }
) {
    await dbConnect();

    try {
        const patientId = params.patientId
        const reqBody = await req.json();
        const { drugs, payment } = reqBody;

        if (!patientId) {
            return Response.json({ success: false, message: "Patient id is required" }, { status: 404 })
        }

        const newPrescription = new PrescriptionModel({
            drugs,
            payment,
            ownerId: patientId,
        })

        await newPrescription.save();

        return Response.json({ success: true, message: 'Prescription saved successfully.', prescription: newPrescription }, { status: 201 });

    } catch (error) {
        console.error('Error adding new prescription:', error);
        return Response.json({ success: false, message: 'Error registering new patient', }, { status: 500 });
    }
}



export async function GET(
    req: Request,
    { params }: { params: { patientId: string } }
) {
    await dbConnect();
    const authResult = await authenticate(req)

    if ('status' in authResult) {
        return Response.json(authResult, { status: authResult.status })
    }

    try {
        const patientId = params.patientId

        if (!patientId) {
            return Response.json({ success: false, message: "Patient id is required" }, { status: 404 })
        }

        const prescriptions = await PrescriptionModel.find({ ownerId: patientId })

        if (!prescriptions) {
            return Response.json({ success: false, message: "Prescription not found" }, { status: 404 })
        }

        return Response.json(prescriptions);
    } catch (error) {
        return Response.json({ success: false, message: 'Something went wrong', }, { status: 500 });
    }
}
