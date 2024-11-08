import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email service (e.g., Gmail, SMTP)
  auth: {
    user: process.env.EMAIL_USER, // Your email address from environment variables
    pass: process.env.EMAIL_PASS, // Your email password or app password from environment variables
  },
});

export const sendConfirmationEmail = async (to: string, displayName: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender address
      to, // Recipient address
      subject: 'Welcome to Our Service', // Subject line
      text: `Hello ${displayName},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nThe Team`, // Plain text body
      html: `<p>Hello ${displayName},</p><p>Thank you for signing up! We're excited to have you on board.</p><p>Best regards,<br>The Team</p>`, // HTML body
    });
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
