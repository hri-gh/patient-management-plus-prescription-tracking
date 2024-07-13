import dbConnect from "@/lib/db-connect";
import PrescriptionModel from "@/models/prescription.model";


export async function POST(request: Request) {
    await dbConnect();

    try {
        const reqBody = await request.json();
        const { drugs, payment, owner } = reqBody;

        const newPrescription = new PrescriptionModel({
            drugs,
            payment,
            owner,
        })

        await newPrescription.save();

        return Response.json({ success: true, message: 'Patient registered successfully.' }, { status: 201 });

    } catch (error) {
        console.error('Error adding new prescription:', error);
        return Response.json({ success: false, message: 'Error registering new patient', }, { status: 500 });
    }
}
