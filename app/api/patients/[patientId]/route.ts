import dbConnect from "@/lib/db-connect";
import PatientModel from "@/models/patient.model";
import { Patient } from "@/types/patient.interface";
import { authenticate } from "@/helpers/auth";

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

        const patient = await PatientModel.findById(patientId);

        if (!patient) {
            return Response.json({ success: false, message: "Patient not found" }, { status: 404 })
        }

        return Response.json(patient, { status: 200 })
    } catch (error) {
        // console.error('Error registering patient:', error);
        return Response.json({ message: 'Internal server error', success: false }, { status: 500 });
    }
}


export async function DELETE(
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

        const patient = await PatientModel.findByIdAndDelete(patientId);

        if (!patient) {
            return Response.json({ success: false, message: "Patient not found" }, { status: 404 })
        }

        return Response.json({ success: true, message: 'Patient deleted successfully.', deletedPatient: patient }, { status: 200 });
    } catch (error) {
        // console.error('[PATIENT_DELETE]', error);
        return Response.json({ success: false, message: 'Something went wrong', }, { status: 500 });
    }
}


export async function PATCH(
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

        const reqBody: Patient = await req.json();
        const { name, mobile, email, age, gender, place, } = reqBody;

        if (!name || !mobile || !email || !age || !gender || !place)
            return Response.json({ success: false, message: "All fields are required" }, { status: 404 })

        if (!patientId) {
            return Response.json({ success: false, message: "Patient id is required" }, { status: 404 })
        }

        const patient = await PatientModel.findByIdAndUpdate(patientId, {
            $set: {
                name,
                mobile,
                email,
                age,
                gender,
                place,
            },
        }, { new: true });

        if (!patient) {
            return Response.json({ success: false, message: "Patient not found" }, { status: 404 });
        }

        return Response.json({ success: true, message: 'Patient updated successfully.', updatedPatient: patient }, { status: 200 });


    } catch (error) {
        console.error('[PATIENT_PATCH]', error);
        return Response.json({ success: false, message: 'Error updating patient', }, { status: 500 });
    }
}
