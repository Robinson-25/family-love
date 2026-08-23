import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";

// GET público: lista todas las noticias
export const GET = async () => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM noticia ORDER BY createdAt DESC"
    );
    return NextResponse.json({ noticias: rows });
  } catch (error) {
    console.error("Error obteniendo noticias:", error);
    return NextResponse.json(
      { error: "Error al obtener las noticias" },
      { status: 500 }
    );
  }
};

// POST protegido: crea una nueva noticia (solo admin/colaborador)
export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role === "customer") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { titulo, resumen, contenido, imagen, video, fecha } = body;

    if (!titulo || !resumen || !contenido || !imagen || !fecha) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const [result]: any = await db.execute(
      `INSERT INTO noticia (titulo, resumen, contenido, imagen, video, fecha)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [titulo, resumen, contenido, imagen, video || null, fecha]
    );

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (error) {
    console.error("Error creando noticia:", error);
    return NextResponse.json(
      { error: "Error al crear la noticia" },
      { status: 500 }
    );
  }
};
