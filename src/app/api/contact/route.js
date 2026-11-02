import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Regular expression for RFC 5322 compliant email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // 1. Spam mitigation: if the hidden honeypot field is filled, silently succeed
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // 2. Server-side validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedSubject = typeof subject === 'string' ? subject.trim() : 'Portfolio Contact Message';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid name between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Please provide a message between 10 and 3,000 characters.' },
        { status: 400 }
      );
    }

    // 3. Check for Resend API Key configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_TO_EMAIL || 'md20sumon25ahmed@gmail.com';
    const senderEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

    if (!resendApiKey) {
      // Truthful 503 response with preformatted fallback mailto link
      const fallbackSubject = encodeURIComponent(`Portfolio Message from ${trimmedName}: ${trimmedSubject}`);
      const fallbackBody = encodeURIComponent(`From: ${trimmedName} (${trimmedEmail})\n\n${trimmedMessage}`);
      const fallbackMailto = `mailto:${recipientEmail}?subject=${fallbackSubject}&body=${fallbackBody}`;

      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: 'Email delivery service is currently unconfigured. Please add your RESEND_API_KEY in .env.local',
          fallbackMailto,
        },
        { status: 503 }
      );
    }

    // 4. Dispatch email via Resend
    const resend = new Resend(resendApiKey);

    const emailSubject = trimmedSubject || `Portfolio Inquiry from ${trimmedName}`;

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: trimmedEmail,
      subject: `[Portfolio Inquiry] ${emailSubject} - from ${trimmedName}`,
      text: `New contact message from portfolio website:\n\nSender Name: ${trimmedName}\nSender Email: ${trimmedEmail}\nSubject: ${emailSubject}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New Message from Portfolio</h2>
            <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">A visitor submitted a message via your website contact form</p>
          </div>
          <div style="padding: 24px; color: #1e293b;">
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; width: 110px; font-weight: 600;">Sender Name:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${trimmedName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Sender Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${trimmedEmail}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${trimmedEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Subject:</td>
                  <td style="padding: 6px 0; color: #0f172a;">${emailSubject}</td>
                </tr>
              </table>
            </div>
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 15px; font-weight: 600; color: #0f172a; margin: 0 0 10px 0;">Message:</h3>
              <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${trimmedMessage}</div>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
            <p style="font-size: 12px; color: #64748b; margin: 0; line-height: 1.5;">
              💡 <strong>Direct Reply:</strong> Click <strong>Reply</strong> in your Gmail / email app to respond directly to <strong>${trimmedName}</strong> at <strong>${trimmedEmail}</strong>.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend delivery error:', error);
      return NextResponse.json(
        { success: false, error: error.message || 'Delivery provider rejected the request. Please use direct email.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: 'Message delivered successfully.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please reach out via direct email.' },
      { status: 500 }
    );
  }
}
