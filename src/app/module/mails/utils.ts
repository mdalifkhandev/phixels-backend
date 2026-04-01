import nodemailer from "nodemailer";
import config from "../../config";

// Email configuration interface
export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: string | Buffer;
  }>;
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(config.SMTP_PORT || "587"),
    secure: config.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: config.NODE_MILER_USER,
      pass: config.NODE_MILER_PASS,
    },
  });
};

// Main email sending function
export const SendMail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: options.from || config.NODE_MILER_USER,
      to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      cc: options.cc
        ? Array.isArray(options.cc)
          ? options.cc.join(", ")
          : options.cc
        : undefined,
      bcc: options.bcc
        ? Array.isArray(options.bcc)
          ? options.bcc.join(", ")
          : options.bcc
        : undefined,
      attachments: options.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Generate formal HTML email template
export const getFormalEmailHtml = (
  subject: string,
  text: string,
  details?: string,
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #FFFFFF;
                background-color: #050505;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
            }
            .email-wrapper {
                background-color: #050505;
                padding: 40px 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #0A0A0A;
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }
            .header {
                background: linear-gradient(135deg, #ED1F24 0%, #8A0303 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
                position: relative;
            }
            .header::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: #FFFF00;
                opacity: 0.3;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 800;
                letter-spacing: -0.02em;
                text-transform: uppercase;
            }
            .content {
                padding: 40px 35px;
            }
            .content h2 {
                color: #ED1F24;
                margin-top: 0;
                font-size: 22px;
                font-weight: 700;
                letter-spacing: -0.01em;
            }
            .content p {
                margin: 20px 0;
                color: #CCCCCC;
                font-size: 16px;
            }
            .details-section {
                background: rgba(255, 255, 255, 0.03);
                padding: 25px;
                border-left: 3px solid #FFFF00;
                margin: 30px 0;
                border-radius: 8px;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                border-right: 1px solid rgba(255, 255, 255, 0.05);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            .details-section h3 {
                margin-top: 0;
                color: #FFFF00;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 15px;
            }
            .details-section p {
                margin: 0;
                color: #FFFFFF;
                font-size: 15px;
                line-height: 1.8;
            }
            .footer {
                background: #080808;
                padding: 30px;
                text-align: center;
                color: #666666;
                font-size: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
            }
            .footer p {
                margin: 8px 0;
            }
            .footer a {
                color: #ED1F24;
                text-decoration: none;
            }
            .accent-text {
                color: #ED1F24;
                font-weight: 600;
            }
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="email-container">
                <div class="header">
                    <h1>PHIXELS.IO</h1>
                </div>
                <div class="content">
                    <h2>${subject}</h2>
                    <p>${text}</p>
                    ${
                      details
                        ? `
                        <div class="details-section">
                            <h3>Project Summary</h3>
                            <p>${details}</p>
                        </div>
                    `
                        : ""
                    }
                    <p>Best Regards,<br/><span class="accent-text">Team Phixels</span></p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} <a href="https://phixels.io">Phixels.io</a>. All rights reserved.</p>
                    <p>Designed with excellence for digital pioneers.</p>
                    <p>This is an automated email. Please do not reply to this message.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Generate formal plain text email template
export const getFormalEmailText = (
  subject: string,
  text: string,
  details?: string,
): string => {
  return `
${subject}

${text}

${details ? `Additional Details:\n${details}` : ""}

---
© ${new Date().getFullYear()} Phixels.io. All rights reserved.
This is an automated email. Please do not reply to this message.
  `;
};
