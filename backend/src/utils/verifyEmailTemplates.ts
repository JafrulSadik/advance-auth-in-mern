// Email templates for verify email
export const verifyEmailTemplate = (name: string, verificationCode: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f8f8f8;
          border-radius: 5px;
          padding: 30px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        .verification-code {
          background-color: #3498db;
          color: white;
          font-size: 24px;
          font-weight: bold;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #7f8c8d;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <p>Hello ${name},</p>
        <p>Thank you for signing up. Please use the following code to verify your email address:</p>
        <div class="verification-code">${verificationCode}</div>
        <p>This code will expire in 24 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>Auth Test Team</p>
      </div>
      <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `;
};

export const verifyEmailSubject = "Verify Your Email Address";

export const resetPasswordEmailTemplate = (name: string, resetLink: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f8f8f8;
          border-radius: 5px;
          padding: 30px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        .reset-button {
          background-color: #3498db;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #7f8c8d;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Reset Your Password</h1>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
        <p>To reset your password, please click the button below:</p>
        <a href="${resetLink}" class="reset-button" target="_blank">Reset Password</a>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p>${resetLink}</p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>Best regards,<br>Auth Test Team</p>
      </div>
      <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `;
};

export const resetPasswordEmailSubject = "Reset Your Password";
