import dbConnect from "@/lib/db-connect";
import PrescriptionModel from "@/models/prescription.model";
import { authenticate } from "@/helpers/auth";
import mongoose from "mongoose";
import { sendPaymentReminderEmail } from "@/helpers/send-payment-reminder-email";

export async function POST(
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

        const patient = await PrescriptionModel.aggregate(
            [
                {
                    $lookup: {
                        from: 'patients', // assuming the patients collection is named 'patients'
                        localField: 'ownerId',
                        foreignField: '_id',
                        as: 'owner'
                    }
                },
                {
                    $unwind: '$owner'
                },
                {
                    $match: {
                        ownerId: new mongoose.Types.ObjectId(patientId)
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalDueAmount: { $sum: '$payment.dueAmount' },
                        email: { $first: '$owner.email' },
                        name: { $first: '$owner.name' }
                    }
                }
            ]
        )

        // Send payment reminder email
        const formatedPatient = {
            email: patient[0].email,
            name: patient[0].name,
            totalDueAmount: patient[0].totalDueAmount
        }

        const emailResponse = await sendPaymentReminderEmail(
            formatedPatient.email,
            formatedPatient.name,
            formatedPatient.totalDueAmount
        )

        // console.log("Patient Due Amount:", formatedPatient)

        if (!emailResponse.success) {
            return Response.json({ success: false, message: emailResponse.message, }, { status: 500 });
        }

        return Response.json({ success: true, message: 'Payment reminder message send successfully.', patient: patient }, { status: 200 });

    } catch (error) {
        console.error('Error sending payment reminder email:', error);
        return Response.json({ success: false, message: 'Error sending payment reminder email', }, { status: 500 });
    }
}
