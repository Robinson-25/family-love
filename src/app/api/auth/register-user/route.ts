import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { username, email, password, role } = await req.json();

  try {
    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (usernameExists) {
      return NextResponse.json({ error: "Este usuario ya existe" });
    } else if (emailExists) {
      return NextResponse.json({ error: "Este correo ya existe" });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHashed,
        role: role ? role : "customer",
      },
    });

    const token = jwt.sign(
      { sub: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: 60 * 10 }
    );

    await resend.emails.send({
      from: "Hospedaje El Rinconcito <onboarding@resend.dev>", // ✅ CORREGIDO
      to: [email],
      subject: "Activa tu cuenta",
      html: `<div>
                <p>Hola <strong>${username}</strong>, verifica tu cuenta con el siguiente enlace:</p>
                <a href="${process.env.NEXTAUTH_URL}/register/verify-email/activate-account?at=${token}">
                  Verifica tu correo electrónico
                </a>
             </div>`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error en registro:", error); // ✅ para ver el error real en consola
    return NextResponse.json({ error }, { status: 500 });
  }
}