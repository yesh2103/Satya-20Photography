import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  message?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter based on environment
    if (process.env.NODE_ENV === 'production') {
      // Production SMTP configuration
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development mode - log emails instead of sending
      this.transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'unix',
        buffer: true,
      });
    }
  }

  async sendOwnerNotification(formData: ContactFormData): Promise<boolean> {
    try {
      const ownerEmail = process.env.OWNER_EMAIL || 'Rajkarthikeya10@gmail.com';
      
      const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@satyaphotography.com',
        to: ownerEmail,
        subject: `New ${formData.event_type} Inquiry from ${formData.name}`,
        html: this.generateOwnerEmailTemplate(formData),
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('📧 Owner notification email (dev mode):');
        console.log('Subject:', mailOptions.subject);
        console.log('To:', mailOptions.to);
        console.log('Content:', result.message?.toString());
      }

      return true;
    } catch (error) {
      console.error('Failed to send owner notification:', error);
      return false;
    }
  }

  async sendUserConfirmation(formData: ContactFormData): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@satyaphotography.com',
        to: formData.email,
        subject: 'Thank you for your inquiry - Satya Photography',
        html: this.generateUserConfirmationTemplate(formData),
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('📧 User confirmation email (dev mode):');
        console.log('Subject:', mailOptions.subject);
        console.log('To:', mailOptions.to);
        console.log('Content:', result.message?.toString());
      }

      return true;
    } catch (error) {
      console.error('Failed to send user confirmation:', error);
      return false;
    }
  }

  private generateOwnerEmailTemplate(formData: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Inquiry - Satya Photography</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: #FFD700; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #333; }
          .value { color: #555; margin-top: 5px; }
          .footer { background: #333; color: #FFD700; padding: 15px; text-align: center; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📸 New Photography Inquiry</h1>
            <p>Satya Photography</p>
          </div>
          
          <div class="content">
            <h2>Client Details:</h2>
            
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${formData.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${formData.email}</div>
            </div>
            
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${formData.phone}</div>
            </div>
            
            <div class="field">
              <div class="label">Event Type:</div>
              <div class="value">${formData.event_type.charAt(0).toUpperCase() + formData.event_type.slice(1)}</div>
            </div>
            
            <div class="field">
              <div class="label">Event Date:</div>
              <div class="value">${new Date(formData.event_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</div>
            </div>
            
            ${formData.message ? `
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${formData.message}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Submitted:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>Reply to this inquiry as soon as possible to provide excellent customer service.</p>
            <p>© 2024 Satya Photography</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateUserConfirmationTemplate(formData: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You - Satya Photography</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: #FFD700; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #333; }
          .value { color: #555; margin-top: 5px; }
          .footer { background: #333; color: #FFD700; padding: 15px; text-align: center; font-size: 14px; }
          .highlight { background: #FFD700; color: #000; padding: 10px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📸 Thank You for Your Inquiry!</h1>
            <p>Satya Photography</p>
          </div>
          
          <div class="content">
            <p>Dear ${formData.name},</p>
            
            <p>Thank you for reaching out to Satya Photography! We've received your inquiry for <strong>${formData.event_type}</strong> photography services.</p>
            
            <div class="highlight">
              <strong>What happens next?</strong><br>
              We'll review your requirements and get back to you within 24 hours with a detailed proposal and availability confirmation.
            </div>
            
            <h3>Your Inquiry Summary:</h3>
            
            <div class="field">
              <div class="label">Event Type:</div>
              <div class="value">${formData.event_type.charAt(0).toUpperCase() + formData.event_type.slice(1)}</div>
            </div>
            
            <div class="field">
              <div class="label">Event Date:</div>
              <div class="value">${new Date(formData.event_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</div>
            </div>
            
            <div class="field">
              <div class="label">Contact:</div>
              <div class="value">${formData.email} • ${formData.phone}</div>
            </div>
            
            ${formData.message ? `
            <div class="field">
              <div class="label">Your Message:</div>
              <div class="value">${formData.message}</div>
            </div>
            ` : ''}
            
            <p>In the meantime, feel free to browse our <a href="#" style="color: #FFD700;">portfolio</a> to see more of our work.</p>
            
            <p>If you have any urgent questions, feel free to call us at <strong>+91 8374877776</strong>.</p>
            
            <p>Best regards,<br>
            <strong>Satya Photography Team</strong></p>
          </div>
          
          <div class="footer">
            <p>📧 Rajkarthikeya10@gmail.com | 📞 +91 8374877776 | 📍 Hanamkonda, Warangal, Telangana</p>
            <p>© 2024 Satya Photography - Capturing Life's Golden Moments</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export const emailService = new EmailService();
