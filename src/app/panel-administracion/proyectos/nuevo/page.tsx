import ProyectoForm from "../_components/ProyectoForm";

export default function NuevoProyectoPage() {
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Nuevo proyecto</h2>
      <p className="text-gray-500 text-sm mb-6">
        Completa la información y súbelo. Aparecerá automáticamente en la página de Proyectos Realizados.
      </p>
      <ProyectoForm />
    </div>
  );
}
