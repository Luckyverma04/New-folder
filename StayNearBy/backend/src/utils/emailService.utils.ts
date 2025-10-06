import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, token: string, name: string): Promise<void> => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    // Create transporter directly
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - StayNearBy',
      html: `
        <h2>Welcome to StayNearBy, ${name}! 🎉</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>Or copy this link: ${verificationUrl}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    // Don't throw error to avoid breaking signup process
  }
};

export const sendWelcomeEmail = async (email: string, name: string, role: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to StayNearBy!',
      html: `
        <h2>Welcome to StayNearBy, ${name}! 🎉</h2>
        <p>Your account has been verified successfully.</p>
        <p><strong>Role:</strong> ${role}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};