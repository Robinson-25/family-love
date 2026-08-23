import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";

const COLORES = [
  "from-orange-400 to-rose-500",
  "from-pink-400 to-purple-500",
  "from-purple-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-yellow-400 to-orange-500",
  "from-blue-500 to-cyan-500",
  "from-[#1a3a6b] to-[#2251a3]",
];

function colorAleatorio() {
  return COLORES[Math.floor(Math.random() * COLORES.length)];
}

// GET público: lista todos los proyectos (usado en la web y en el panel)
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const anio = searchParams.get("anio");

    let rows: any;
    if (anio) {
      [rows] = await db.execute(
        "SELECT * FROM proyecto WHERE anio = ? ORDER BY createdAt DESC",
        [anio]
      );
    } else {
      [rows] = await db.execute("SELECT * FROM proyecto ORDER BY anio DESC, createdAt DESC");
    }

    const proyectos = (rows as any[]).map((p) => ({
      ...p,
      fotos: p.fotos ? JSON.parse(p.fotos) : [],
    }));

    return NextResponse.json({ proyectos });
  } catch (error) {
    console.error("Error obteniendo proyectos:", error);
    return NextResponse.json(
      { error: "Error al obtener los proyectos" },
      { status: 500 }
    );
  }
};

// POST protegido: crea un nuevo proyecto (solo admin/colaborador)
export const POST = async (req: NextRequest) => {
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

    const [result]: any = await db.execute(
      `INSERT INTO proyecto (titulo, fecha, anio, resumen, descripcion, imagen, fotos, video, etiqueta, color, emoji)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        colorAleatorio(),
        emoji || "💙",
      ]
    );

    return NextResponse.json({ ok: true, id: result.insertId });
  } catch (error) {
    console.error("Error creando proyecto:", error);
    return NextResponse.json(
      { error: "Error al crear el proyecto" },
      { status: 500 }
    );
  }
};
