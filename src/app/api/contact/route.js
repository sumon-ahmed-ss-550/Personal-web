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
    const recipientEmail = process.env.CONTACT_TO_EMAIL || 'md20sumon25@gmail.com';
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
          error: 'Email delivery service is currently unconfigured on this host.',
          fallbackMailto,
        },
        { status: 503 }
      );
    }

    // 4. Dispatch email via Resend
    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: trimmedEmail,
      subject: `[Portfolio Inquiry] ${trimmedSubject}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Delivery provider rejected the request. Please use direct email.' },
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
