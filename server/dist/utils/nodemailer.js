import { transporter } from "../config/nodemailer-config.js";
export async function sendVerificationCode(email, otp) {
    const info = await transporter.sendMail({
        from: '"DocGPT 👻" <docgpt.app@gmail.com>',
        to: `${email}`,
        subject: "DocGPT email verification code ✔",
        text: "DocGPT verification code",
        html: `
      <div class="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2>Email Verification Code</h2>
        <p>Please use the following code to verify your email address:</p>
        <div class="verification-code" style="font-size: 24px; font-weight: bold; color: #333333;">${otp}</div>
        <p>If you did not request this verification, you can safely ignore this email.</p>
      </div>
    `,
    });
    // ToDo: add it to the email so that user can directly verify from email without having to switch tabs to enter OTP.
    // <a href="http://localhost:5173/verifyotp/${otp}" class="button" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">Verify Email</a>
}
//# sourceMappingURL=nodemailer.js.map