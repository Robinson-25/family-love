import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, edad, email, telefono, motivacion } = await req.json();

    // Validar campos obligatorios
    if (!nombre || !edad || !email || !telefono) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Guardar en base de datos
    await prisma.voluntario.create({
      data: {
        nombre,
        edad: parseInt(edad),
        email,
        telefono,
        motivacion: motivacion || "",
      },
    });

    // Enviar correo de notificación
    await resend.emails.send({
      from: "Family Love <onboarding@resend.dev>",
      to: "robinsonwelkinbiktuchumpi@gmail.com",
      subject: `🌟 Nuevo voluntario: ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a3a6b, #2251a3); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">¡Nuevo Voluntario! 🎉</h1>
            <p style="color: rgba(255,255,255,0.8); margin-top: 8px;">Family Love ha recibido una nueva solicitud</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 40%;">👤 Nombre</td>
                <td style="padding: 12px 0; color: #6b7280;">${nombre}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold; color: #374151;">🎂 Edad</td>
                <td style="padding: 12px 0; color: #6b7280;">${edad} años</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold; color: #374151;">📧 Correo</td>
                <td style="padding: 12px 0; color: #6b7280;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px 0; font-weight: bold; color: #374151;">📱 Teléfono</td>
                <td style="padding: 12px 0; color: #6b7280;">${telefono}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #374151; vertical-align: top;">💬 Motivación</td>
                <td style="padding: 12px 0; color: #6b7280;">${motivacion || "No especificó"}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #dbeafe; border-radius: 12px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                💡 Recuerda contactar a este voluntario pronto para darle la bienvenida a Family Love.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al guardar voluntario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}