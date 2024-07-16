import dbConnect from "@/lib/db-connect";
import AdminModel from "@/models/admin.model";


export async function POST(request: Request) {
    await dbConnect()

    try {
        const { code } = await request.json();

        const admin = await AdminModel.findOne();

        if (!admin) {
            return Response.json({ success: false, message: 'Not found' }, { status: 404 });
        }

        const isOtpValid = admin.verifyCode === code
        const isOtpNotExpired = new Date(admin.verifyCodeExpiry) > new Date();

        if (isOtpValid && isOtpNotExpired) {
            // Update the user's verification status
            admin.isVerified = true;
            admin.verifyCode = "";
            await admin.save();


            return Response.json(
                { success: true, message: 'Account verified successfully' },
                { status: 200 }
            );
        } else if (!isOtpNotExpired) {
            // Code has expired
            return Response.json(
                {
                    success: false,
                    message:
                        'Verification code has expired. Please resend a new code.',
                },
                { status: 400 }
            );
        } else {
            // Code is incorrect
            return Response.json(
                { success: false, message: 'Incorrect verification code' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Error verifying user:', error);
        return Response.json(
            { success: false, message: 'Error verifying user' },
            { status: 500 }
        );
    }
}
