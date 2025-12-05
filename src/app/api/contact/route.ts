// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { name, contact, message } = await req.json();

//     if (!name || !contact || !message) {
//       return NextResponse.json(
//         { error: "All fields are required." },
//         { status: 400 }
//       );
//     }

//     // ✅ Create transporter using Gmail SMTP
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true, // true for 465, false for 587
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     // ✅ Compose email
//     const mailOptions = {
//       from: `"Course Website" <${process.env.SMTP_USER}>`,
//       to: process.env.RECEIVER_EMAIL, // your email address
//       subject: `New Contact Form Submission from ${name}`,
//       text: `
// You have received a new message:

// Name: ${name}
// Contact: ${contact}
// Message: ${message}
//       `,
//     };

//     // ✅ Send email
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Email sending error:", error);
//     return NextResponse.json(
//       { error: "Failed to send email." },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, contact, message, courseName } = await req.json();

    if (!name || !contact || !message || !courseName) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Compose email
    const mailOptions = {
      from: `"Course Website" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Booking for ${courseName} from ${name}`,
      text: `
You have received a new booking:

Name: ${name}
Contact: ${contact}
Message: ${message}
Course Name: ${courseName}
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Booking email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}
