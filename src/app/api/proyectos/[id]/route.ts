import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";

// GET público: obtiene un proyecto por id
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const [rows]: any = await db.execute(
      "SELECT * FROM proyecto WHERE id = ?",
      [params.id]
    );

    const proyecto = rows[0];
    if (!proyecto) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    proyecto.fotos = proyecto.fotos ? JSON.parse(proyecto.fotos) : [];

    return NextResponse.json({ proyecto });
  } catch (error) {
    console.error("Error obteniendo proyecto:", error);
    return NextResponse.json(
      { error: "Error al obtener el proyecto" },
      { status: 500 }
    );
  }
};

// PUT protegido: edita un proyecto existente
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
    const {
      titulo,
      fecha,
      anio,
      resumen,
      descripcion,
      imagen,
      fotos,
      video,
      etiqueta,
      emoji,
    } = body;

    if (!titulo || !fecha || !anio || !resumen || !descripcion || !imagen || !etiqueta) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    await db.execute(
      `UPDATE proyecto SET titulo=?, fecha=?, anio=?, resumen=?, descripcion=?, imagen=?, fotos=?, video=?, etiqueta=?, emoji=?
       WHERE id = ?`,
      [
        titulo,
        fecha,
        anio,
        resumen,
        descripcion,
        imagen,
        JSON.stringify(fotos || [imagen]),
        video || null,
        etiqueta,
        emoji || "💙",
        params.id,
      ]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error actualizando proyecto:", error);
    return NextResponse.json(
      { error: "Error al actualizar el proyecto" },
      { status: 500 }
    );
  }
};

// DELETE protegido: elimina un proyecto
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role === "customer") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await db.execute("DELETE FROM proyecto WHERE id = ?", [params.id]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando proyecto:", error);
    return NextResponse.json(
      { error: "Error al eliminar el proyecto" },
      { status: 500 }
    );
  }
};
