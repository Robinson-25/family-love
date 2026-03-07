import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";


const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
  const { name, email, cellPhone, message } = await req.json();

  try {
    const emailExists = await prisma.newsletterEmail.findUnique({
      where: { email },
    });
    if (!emailExists) {
      const newNewsletterEmail = await prisma.newsletterEmail.create({
        data: { email },
      });
    }

    const data = await resend.emails.send({
      from: "Hospedaje El Rinconcito <onboarding@resend.dev>",
      to: ["robinsonwelkinbiktuchumpi@gmail.com"],
      subject: "Email de cliente",
      html: `<div>
              <p>Enviado por: ${name}</p>
              <p>Contacto: ${cellPhone}</p>
              <p>${message}</p>
           </div>`,
    });

    return NextResponse.json(
      { ok: true, message: "Email enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
