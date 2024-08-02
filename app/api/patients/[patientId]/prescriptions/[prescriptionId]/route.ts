import dbConnect from "@/lib/db-connect";
import PrescriptionModel from "@/models/prescription.model";
import { authenticate } from "@/helpers/auth";

export async function GET(
    req: Request,
    { params }: { params: { patientId: string, prescriptionId: string } }
) {
    await dbConnect();

    const authResult = await authenticate(req)
    if ('status' in authResult) {
        return Response.json(authResult, { status: authResult.status })
    }

    try {
        const patientId = params.patientId
        const prescriptionId = params.prescriptionId

        if (!patientId) {
            return Response.json({ success: false, message: "Patient id is required" }, { status: 404 })
        }

        if (!prescriptionId) {
            return Response.json({ success: false, message: "Prescription id is required" }, { status: 404 })
        }
        const prescription = await PrescriptionModel.findOne({
            _id: prescriptionId,
            ownerId: patientId
        })

        if (!prescription) {
            return Response.json({ success: false, message: "Prescription not found" }, { status: 404 })
        }
        return Response.json(prescription, { status: 200 })
    } catch (error) {
        return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
    }

}


export async function DELETE(
    req: Request,
    { params }: { params: { patientId: string, prescriptionId: string } }
) {
    await dbConnect();

    const authResult = await authenticate(req)
    if ('status' in authResult) {
        return Response.json(authResult, { status: authResult.status })
    }

    try {
        const patientId = params.patientId
        const prescriptionId = params.prescriptionId

        if (!patientId) {
            return Response.json({ success: false, message: "Patient id is required" }, { status: 404 })
        }

        if (!prescriptionId) {
            return Response.json({ success: false, message: "Prescription id is required" }, { status: 404 })
        }
        const prescription = await PrescriptionModel.findOneAndDelete({
            _id: prescriptionId,
            ownerId: patientId
        })

        if (!prescription) {
            return Response.json({ success: false, message: "Prescription not found" }, { status: 404 })
        }

        return Response.json({ success: true, message: 'Prescription deleted successfully.', deletedPrescription: prescription }, { status: 200 });
    } catch (error) {
        return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
    }

}


export async function PATCH(
    req: Request,
    { params }: { params: { patientId: string, prescriptionId: string } }
) {
    await dbConnect();

    const authResult = await authenticate(req)
    if ('status' in authResult) {
        return Response.json(authResult, { status: authResult.status })
    }

    try {
        const reqBody = await req.json();
        const { drugs, payment } = reqBody;

        const patientId = params.patientId
        const prescriptionId = params.prescriptionId

        if (!patientId) {
            return Response.json({ success: false, message: "Patient id is required" }, { status: 404 })
        }

        if (!prescriptionId) {
            return Response.json({ success: false, message: "Prescription id is required" }, { status: 404 })
        }


        const prescription = await PrescriptionModel.findOneAndUpdate(
            {
                _id: prescriptionId,
                ownerId: patientId
            },
            {
                $set: {
                    drugs,
                    payment,
                }
            }, { new: true }
        )

        if (!prescription) {
            return Response.json({ success: false, message: "Prescription not found" }, { status: 404 })
        }

        return Response.json({ success: true, message: 'Prescription updated successfully.', updatedPrescription: prescription }, { status: 200 });
    } catch (error) {
        return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
    }

}
