"use server"
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({
    name,
    email,
    subject,
    message,
  }: {
    name?: string;
    email: string;
    subject: string;
    message: string;
  }) {
    if ([name, email, subject, message].some((value) => !value?.trim())) {
      return {
        statusCode: 400,
        success: false,
        message: "All fields are required.",
      };
    }
  
    try {
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>', 
        to: "siddh907729@gmail.com", 
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <p><strong>Name:</strong> ${name || "Anonymous"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
  
      return {
        statusCode: 200,
        success: true,
        message: "Email sent successfully!",
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        message: "Error sending email. Try again later.",
      };
    }
  }
  
// started with some actions but then switched onto api's


// "use server";

// import nodemailer from "nodemailer"
// import { ApiError } from "@/utils/ApiError";
// import { ApiResponse } from "@/utils/ApiResponse";

// export async function sendContactEmail({
//   name,
//   email,
//   subject,
//   message,
// }: {
//   name?: string;
//   email: string;
//   subject: string;
//   message: string;
// }): Promise<ApiResponse<{ message: string }>> {
//   if ([name, email, subject, message].some((value) => !value?.trim())) {
//     throw new ApiError(400, "All fields are required.");
//   }

//   const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST, 
//     port: Number(process.env.MAIL_PORT) || 587,
//     secure: false, 
//     auth: {
//       user: process.env.MAIL_USER, 
//       pass: process.env.MAIL_PASS, 
//     },
//   });

//   try {
//   
//     await transporter.sendMail({
//       from: `"${name || "Anonymous"}" <${process.env.MAIL_USER}>`, // Sender
//       to: process.env.MAIL_RECEIVER || "your-email@gmail.com", // Receiver
//       subject: `New Contact Form Submission: ${subject}`,
//       html: `
//         <p><strong>Name:</strong> ${name || "Anonymous"}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong> ${message}</p>
//       `,
//     });

//     return new ApiResponse(200, { message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Nodemailer Error:", error);
//     return new ApiResponse(500, { message: "Error sending email. Try again later." }, "Failed");
//   }
// }
