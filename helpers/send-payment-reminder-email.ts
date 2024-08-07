import PaymentReminderEmailTemplate from "@/components/emails/payment-reminder-email-template";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/api-response";

export async function sendPaymentReminderEmail(
    email: string,
    name: string,
    totalDueAmount: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Payment Reminder from Patient+Plus',
            react: PaymentReminderEmailTemplate({ name, dueAmount: totalDueAmount }),
        });
        return { success: true, message: 'Payment reminder email sent successfully.' };
    } catch (emailError) {
        // console.error('Error sending payment reminder email:', emailError);
        return { success: false, message: 'Failed to send payment reminder email.' };
    }
}
