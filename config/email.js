// config/email.js
import nodemailer from 'nodemailer';
import 'dotenv/config'; // Ensure environment variables are loaded

// Create a Nodemailer transporter using your SMTP settings
// You can use a service like Gmail, SendGrid, Mailgun, etc.
// For Gmail, you'd typically need to set up "App passwords" if 2FA is enabled.
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,        // e.g., 'smtp.gmail.com'
    port: parseInt(process.env.EMAIL_PORT || 587), // e.g., 587 for TLS, 465 for SSL
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,    // your email address
        pass: process.env.EMAIL_PASS     // your email password or app-specific password
    }
});

// Verify connection configuration (optional, but good for debugging)
transporter.verify(function (error, success) {
    if (error) {
        console.error('Nodemailer transporter verification failed:', error);
    } else {
        console.log('Nodemailer transporter is ready to send emails.');
    }
});

// Function to send an email
export async function sendEmail({ to, subject, text, html }) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Subscription Tracker" <no-reply@yourdomain.com>', // sender address
            to,       // list of receivers
            subject,  // Subject line
            text,     // plain text body
            html      // html body
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Re-throw to be handled by the calling workflow step
    }
}