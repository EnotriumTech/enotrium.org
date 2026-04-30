import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, age, major, minor, year, linkedin, github, interest } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !age || !major || !year || !interest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log registration
    console.log("Registration received:", {
      firstName,
      lastName,
      email,
      age,
      major,
      minor,
      year,
      linkedin,
      github,
      interest,
    });

    // Send confirmation email
    if (resend) {
      try {
        await resend.emails.send({
          from: "enotrium@atomicmail.io",
          to: email,
          subject: "Registration Confirmed - Enotrium x Do Quantum Hackathon",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #000;">Registration Confirmed</h2>
              <p>Hi ${firstName},</p>
              <p>Your registration for the <strong>Enotrium x Do Quantum Hackathon</strong> has been confirmed.</p>
              <p><strong>Event Details:</strong></p>
              <ul>
                <li>Date: Saturday, May 16, 2026</li>
                <li>Time: 1:00 PM</li>
              </ul>
              <p>We look forward to seeing you there!</p>
              <p>Best regards,<br>The Enotrium Team</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Continue with registration even if email fails
      }
    } else {
      console.log("Resend API key not configured, skipping email");
    }

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
