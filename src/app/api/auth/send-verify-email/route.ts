import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      if (user.emailVerified) {
        return NextResponse.json({ error: "La cuenta ya está activada" });
      }
      const token = jwt.sign(
        { sub: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: 60 * 10,
        }
      );
      const data = await resend.emails.send({
        from: "Hospedaje El Rinconcito <noreply@hospedajerinconcito.com>",
        to: [email],
        subject: "Activa tu cuenta",
        html: `<div>
                <p>Hola <strong>${user.username}</strong> verifica tu cuenta con el siguiente enlace</p>
                <a href="${process.env.NEXTAUTH_URL}/register/verify-email/activate-account?at=${token}">Verifica tu correo electrónico</a>
             </div>`,
      });

      return NextResponse.json(
        { ok: true, message: "Email enviado correctamente" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "El usuario no existe" });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
