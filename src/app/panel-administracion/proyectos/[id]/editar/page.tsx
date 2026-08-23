import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProyectoForm from "../../_components/ProyectoForm";

async function getProyecto(id: string) {
  const [rows]: any = await db.execute("SELECT * FROM proyecto WHERE id = ?", [id]);
  const proyecto = rows[0];
  if (!proyecto) return null;
  return {
    id: proyecto.id,
    titulo: proyecto.titulo,
    fecha: proyecto.fecha,
    anio: String(proyecto.anio),
    resumen: proyecto.resumen,
    descripcion: proyecto.descripcion,
    imagen: proyecto.imagen,
    fotos: proyecto.fotos ? JSON.parse(proyecto.fotos) : [],
    video: proyecto.video || "",
    etiqueta: proyecto.etiqueta,
    emoji: proyecto.emoji,
  };
}

export default async function EditarProyectoPage({
  params,
}: {
  params: { id: string };
}) {
  const proyecto = await getProyecto(params.id);
  if (!proyecto) notFound();

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Editar proyecto</h2>
      <p className="text-gray-500 text-sm mb-6">
        Modifica los datos y guarda los cambios. Se actualizará automáticamente en la web.
      </p>
      <ProyectoForm inicial={proyecto} />
    </div>
  );
}
