import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const [rows] = await db.execute(
      "SELECT * FROM User WHERE email = ?",
      [email]
    ) as any;

    const user = (rows as any[])[0];

    if (user) {
      const token = jwt.sign(
        { sub: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: 60 * 10,
        }
      );

      await resend.emails.send({
        from: "Hospedaje El Rinconcito <noreply@hospedajerinconcito.com>",
        to: [email],
        subject: "Cambia tu contraseña",
        html: `<div>
                <p>Hola <strong>${user.username}</strong>, puedes cambiar tu contraseña con el siguiente enlace:</p>
                <a href="${process.env.NEXTAUTH_URL}/recuperar-contrasena/${token}">Cambiar Contraseña</a>
             </div>`,
      });

      return NextResponse.json(
        { ok: true, message: "Email enviado correctamente" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "El usuario no existe" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("ERROR RECUPERAR CONTRASEÑA:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}