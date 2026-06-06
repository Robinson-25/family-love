import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Resend } from "resend";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const resend = new Resend(process.env.RESEND_API_KEY);

const db = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(req: Request) {
  try {
    // Verificar sesión
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { nombre, edad, email, telefono, motivacion } = await req.json();

    if (!nombre || !edad || !email || !telefono) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    await db.execute(
      "INSERT INTO voluntario (nombre, edad, email, telefono, motivacion) VALUES (?, ?, ?, ?, ?)",
      [nombre, parseInt(edad), email, telefono, motivacion || ""]
    );

    await resend.emails.send({
      from: "Family Love <onboarding@resend.dev>",
      to: "familylovevoluntariado@gmail.com",
      subject: `🌟 Nuevo voluntario: ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a3a6b, #2251a3); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">¡Nuevo Voluntario! 🎉</h1>
            <p style="color: rgba(255,255,255,0.8);">Family Love ha recibido una nueva solicitud</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold;">👤 Nombre</td>
                <td style="padding: 12px 0;">${nombre}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold;">🎂 Edad</td>
                <td style="padding: 12px 0;">${edad} años</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold;">📧 Correo</td>
                <td style="padding: 12px 0;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold;">📱 Teléfono</td>
                <td style="padding: 12px 0;">${telefono}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold;">💬 Motivación</td>
                <td style="padding: 12px 0;">${motivacion || "No especificó"}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}