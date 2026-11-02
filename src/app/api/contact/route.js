import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Regular expression for RFC 5322 compliant email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sanitize user inputs for safe HTML email rendering
const escapeHtml = (str) => {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

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

    // 4. Dispatch email via Resend with mobile-first responsive HTML template
    const resend = new Resend(resendApiKey);

    const emailSubject = trimmedSubject || `Portfolio Inquiry from ${trimmedName}`;
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeSubject = escapeHtml(emailSubject);
    const safeMessage = escapeHtml(trimmedMessage);

    const receivedAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Dhaka',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: recipientEmail,
      replyTo: trimmedEmail,
      subject: `[Portfolio Inquiry] ${emailSubject} - from ${trimmedName}`,
      text: `New contact message from portfolio website:\n\nSender Name: ${trimmedName}\nSender Email: ${trimmedEmail}\nSubject: ${emailSubject}\nReceived: ${receivedAt} (GMT+6)\n\nMessage:\n${trimmedMessage}\n\n---\nReply directly to this email to contact ${trimmedName}.`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message from ${safeName}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9; padding: 20px 10px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;">
                  
                  <!-- Branded Obsidian & Indigo Gradient Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #09090b 0%, #1e1b4b 60%, #312e81 100%); padding: 26px 22px; color: #ffffff;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <span style="display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #a5b4fc; background-color: rgba(255, 255, 255, 0.12); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.18);">
                              Portfolio Inquiry
                            </span>
                            <h1 style="margin: 10px 0 4px 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff; line-height: 1.3;">
                              New Message Received
                            </h1>
                            <p style="margin: 0; font-size: 13px; color: #cbd5e1; line-height: 1.4;">
                              A visitor submitted a message via your portfolio website
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Card Body -->
                  <tr>
                    <td style="padding: 22px 20px;">
                      
                      <!-- Sender Details Box (Mobile-friendly stacked rows) -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 20px; overflow: hidden;">
                        <tr>
                          <td style="padding: 16px;">
                            
                            <!-- Sender Name -->
                            <div style="margin-bottom: 12px;">
                              <span style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin-bottom: 3px;">
                                Sender Name
                              </span>
                              <span style="display: block; font-size: 16px; font-weight: 700; color: #0f172a; word-break: break-word;">
                                ${safeName}
                              </span>
                            </div>

                            <!-- Sender Email -->
                            <div style="margin-bottom: 12px;">
                              <span style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin-bottom: 3px;">
                                Sender Email
                              </span>
                              <a href="mailto:${safeEmail}" style="display: inline-block; font-size: 14px; font-weight: 600; color: #4f46e5; text-decoration: none; word-break: break-all;">
                                ${safeEmail}
                              </a>
                            </div>

                            <!-- Subject -->
                            <div>
                              <span style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin-bottom: 3px;">
                                Subject
                              </span>
                              <span style="display: block; font-size: 14px; font-weight: 600; color: #334155; word-break: break-word;">
                                ${safeSubject}
                              </span>
                            </div>

                          </td>
                        </tr>
                      </table>

                      <!-- Message Box -->
                      <div style="margin-bottom: 22px;">
                        <span style="display: block; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #475569; margin-bottom: 8px;">
                          Message
                        </span>
                        <div style="background-color: #ffffff; border-left: 4px solid #6366f1; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 0 12px 12px 0; padding: 16px 18px; font-size: 15px; line-height: 1.65; color: #1e293b; white-space: pre-wrap; word-break: break-word;">${safeMessage}</div>
                      </div>

                      <!-- One-Tap Direct Reply Action Button -->
                      <div style="margin-bottom: 20px;">
                        <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(emailSubject)}" style="display: block; width: 100%; box-sizing: border-box; background: #6366f1; background-image: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff !important; text-align: center; padding: 14px 20px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);">
                          Reply to ${safeName} &rarr;
                        </a>
                      </div>

                      <!-- Footer Notice -->
                      <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; text-align: center;">
                        <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                          Received on ${receivedAt} (GMT+6) · Sent via Sumon Ahmed Portfolio Contact Form
                        </p>
                      </div>

                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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
