import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import NoticiaForm from "../../_components/NoticiaForm";

async function getNoticia(id: string) {
  const [rows]: any = await db.execute("SELECT * FROM noticia WHERE id = ?", [id]);
  const noticia = rows[0];
  if (!noticia) return null;
  return {
    id: noticia.id,
    titulo: noticia.titulo,
    resumen: noticia.resumen,
    contenido: noticia.contenido,
    imagen: noticia.imagen,
    video: noticia.video || "",
    fecha: noticia.fecha,
  };
}

export default async function EditarNoticiaPage({
  params,
}: {
  params: { id: string };
}) {
  const noticia = await getNoticia(params.id);
  if (!noticia) notFound();

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Editar noticia</h2>
      <p className="text-gray-500 text-sm mb-6">
        Modifica los datos y guarda los cambios. Se actualizará automáticamente en la web.
      </p>
      <NoticiaForm inicial={noticia} />
    </div>
  );
}
