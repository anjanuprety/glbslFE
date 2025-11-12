import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

// Email template generators
const getContactEmailHtml = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Lora', Georgia, serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: white; }
    .header { background: #1a3a1a; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; }
    .content { padding: 30px 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 12px; border-bottom: 1px solid #eee; vertical-align: top; }
    .info-table td:first-child { font-weight: 600; color: #1a3a1a; width: 40%; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    .accent { color: #DAA520; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <p style="margin-bottom: 20px; color: #555;">You have received a new contact form submission from the Gurans Bank website:</p>
      <table class="info-table">
        <tr><td>Name:</td><td>${data.name || 'N/A'}</td></tr>
        <tr><td>Email:</td><td>${data.email || 'N/A'}</td></tr>
        <tr><td>Phone:</td><td>${data.phone || 'N/A'}</td></tr>
        <tr><td>Subject:</td><td>${data.subject || 'N/A'}</td></tr>
        <tr><td>Message:</td><td>${(data.message || 'N/A').replace(/\n/g, '<br>')}</td></tr>
        <tr><td>Submitted:</td><td>${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</td></tr>
        <tr><td>Language:</td><td>${data.language === 'ne' ? 'Nepali (नेपाली)' : 'English'}</td></tr>
      </table>
    </div>
    <div class="footer">
      <p>This email was sent from <span class="accent">Gurans Laghubitta Bittiya Sanstha Ltd.</span> website</p>
      <p style="margin-top: 5px; font-size: 12px; color: #999;">www.guranslaghubitta.com.np</p>
    </div>
  </div>
</body>
</html>
`;

const getComplaintEmailHtml = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Lora', Georgia, serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: white; }
    .header { background: #1a3a1a; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; }
    .content { padding: 30px 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 12px; border-bottom: 1px solid #eee; vertical-align: top; }
    .info-table td:first-child { font-weight: 600; color: #1a3a1a; width: 40%; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    .accent { color: #DAA520; font-weight: 600; }
    .urgent { background: #fff3cd; padding: 15px; border-left: 4px solid #DAA520; margin: 20px 0; border-radius: 4px; }
    .urgent strong { color: #856404; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚠️ New Complaint Registration</h1>
    </div>
    <div class="content">
      <div class="urgent">
        <strong>⚠️ Action Required:</strong> A new complaint has been registered and requires attention.
      </div>
      <table class="info-table">
        <tr><td>Full Name:</td><td>${data.fullName || 'N/A'}</td></tr>
        <tr><td>Mobile Number:</td><td>${data.mobileNumber || 'N/A'}</td></tr>
        <tr><td>Branch Office:</td><td>${data.branchOffice || 'N/A'}</td></tr>
        <tr><td>Complaint Details:</td><td>${(data.complaint || 'N/A').replace(/\n/g, '<br>')}</td></tr>
        <tr><td>Submitted:</td><td>${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</td></tr>
        <tr><td>Language:</td><td>${data.language === 'ne' ? 'Nepali (नेपाली)' : 'English'}</td></tr>
      </table>
    </div>
    <div class="footer">
      <p>This complaint was submitted via <span class="accent">Gurans Laghubitta</span> website</p>
      <p style="margin-top: 5px; font-size: 12px; color: #999;">Please respond to the complainant promptly</p>
    </div>
  </div>
</body>
</html>
`;

const getLoanEmailHtml = (data: any) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Lora', Georgia, serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: white; }
    .header { background: #1a3a1a; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; }
    .content { padding: 30px 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .info-table td { padding: 12px; border-bottom: 1px solid #eee; vertical-align: top; }
    .info-table td:first-child { font-weight: 600; color: #1a3a1a; width: 40%; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    .accent { color: #DAA520; font-weight: 600; }
    .highlight { background: #f0f8ff; padding: 15px; border-radius: 4px; margin: 20px 0; text-align: center; }
    .highlight strong { color: #1a3a1a; font-size: 18px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💰 New Loan Application</h1>
    </div>
    <div class="content">
      <div class="highlight">
        <strong>Loan Amount Requested:</strong> <span class="accent">रु ${data.loanAmount ? Number(data.loanAmount).toLocaleString('en-NP') : 'N/A'}</span>
      </div>
      <table class="info-table">
        <tr><td>Full Name:</td><td>${data.fullName || 'N/A'}</td></tr>
        <tr><td>Email:</td><td>${data.email || 'N/A'}</td></tr>
        <tr><td>Mobile Number:</td><td>${data.mobileNumber || 'N/A'}</td></tr>
        <tr><td>Branch Office:</td><td>${data.branchOffice || 'N/A'}</td></tr>
        <tr><td>Province:</td><td>${data.province || 'N/A'}</td></tr>
        <tr><td>District:</td><td>${data.district || 'N/A'}</td></tr>
        <tr><td>Local Body:</td><td>${data.localBody || 'N/A'}</td></tr>
        <tr><td>Ward Number:</td><td>${data.wardNumber || 'N/A'}</td></tr>
        <tr><td>Loan Amount:</td><td>रु ${data.loanAmount ? Number(data.loanAmount).toLocaleString('en-NP') : 'N/A'}</td></tr>
        <tr><td>Special Notes:</td><td>${(data.specialNote || 'N/A').replace(/\n/g, '<br>')}</td></tr>
        <tr><td>Submitted:</td><td>${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}</td></tr>
        <tr><td>Language:</td><td>${data.language === 'ne' ? 'Nepali (नेपाली)' : 'English'}</td></tr>
      </table>
    </div>
    <div class="footer">
      <p>This application was submitted via <span class="accent">Gurans Laghubitta</span> website</p>
      <p style="margin-top: 5px; font-size: 12px; color: #999;">Please contact the applicant to proceed with the loan process</p>
    </div>
  </div>
</body>
</html>
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formType, data } = req.body;

    if (!formType || !data) {
      return res.status(400).json({ error: 'Missing formType or data' });
    }

    // Determine recipient and email content
    let recipientEmail: string;
    let subject: string;
    let htmlContent: string;

    switch (formType) {
      case 'contact':
        recipientEmail = 'info@example.com';
        subject = `New Contact Form Submission - ${data.name || 'Unknown'}`;
        htmlContent = getContactEmailHtml(data);
        break;

      case 'complaint':
        recipientEmail = 'mail@swornimpangeni.com.np';
        subject = `New Complaint Registration - ${data.fullName || 'Unknown'}`;
        htmlContent = getComplaintEmailHtml(data);
        break;

      case 'loan':
        recipientEmail = 'hr@example.com';
        subject = `New Loan Application - ${data.fullName || 'Unknown'} (रु ${data.loanAmount ? Number(data.loanAmount).toLocaleString('en-NP') : 'N/A'})`;
        htmlContent = getLoanEmailHtml(data);
        break;

      default:
        return res.status(400).json({ error: 'Invalid formType' });
    }

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'Gurans Bank Website <noreply@glbsl.com.np>',
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log('Email sent successfully:', emailResponse);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully'
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
}
