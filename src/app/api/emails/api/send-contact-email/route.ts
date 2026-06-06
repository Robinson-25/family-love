import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
  const { name, email, cellPhone, message } = await req.json();

  try {
    const [rows] = await db.execute(
      "SELECT * FROM newsletterEmail WHERE email = ?",
      [email]
    ) as any;

    const emailExists = (rows as any[])[0];

    if (!emailExists) {
      await db.execute(
        "INSERT INTO newsletterEmail (email) VALUES (?)",
        [email]
      );
    }

    await resend.emails.send({
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