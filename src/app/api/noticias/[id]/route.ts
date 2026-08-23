import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const [rows]: any = await db.execute(
      "SELECT * FROM noticia WHERE id = ?",
      [params.id]
    );
    const noticia = rows[0];
    if (!noticia) {
      return NextResponse.json(
        { error: "Noticia no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json({ noticia });
  } catch (error) {
    console.error("Error obteniendo noticia:", error);
    return NextResponse.json(
      { error: "Error al obtener la noticia" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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

    await db.execute(
      `UPDATE noticia SET titulo=?, resumen=?, contenido=?, imagen=?, video=?, fecha=? WHERE id = ?`,
      [titulo, resumen, contenido, imagen, video || null, fecha, params.id]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error actualizando noticia:", error);
    return NextResponse.json(
      { error: "Error al actualizar la noticia" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role === "customer") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await db.execute("DELETE FROM noticia WHERE id = ?", [params.id]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando noticia:", error);
    return NextResponse.json(
      { error: "Error al eliminar la noticia" },
      { status: 500 }
    );
  }
};
