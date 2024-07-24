import { resend } from "@/lib/resend";
import OtpVerificationEmailTemplate from "@/components/emails/otp-verification-email-template";
import { ApiResponse } from "@/types/api-response";

export async function SendOtpVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            react: OtpVerificationEmailTemplate({ username, otp: verifyCode }),
        });
        return { success: true, message: 'OTP Verification email sent successfully.' };
    } catch (emailError) {
        console.error('Error sending OTP verification email:', emailError);
        return { success: false, message: 'Failed to send OTP verification email.' };
    }
}
