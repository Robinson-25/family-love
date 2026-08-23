import NoticiaForm from "../_components/NoticiaForm";

export default function NuevaNoticiaPage() {
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Nueva noticia</h2>
      <p className="text-gray-500 text-sm mb-6">
        Completa la información y publícala. Aparecerá automáticamente en la página de Noticias.
      </p>
      <NoticiaForm />
    </div>
  );
}
