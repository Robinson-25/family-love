import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getNoticias() {
  try {
    const [rows]: any = await db.execute(
      "SELECT * FROM noticia ORDER BY createdAt DESC"
    );
    return rows;
  } catch {
    return [];
  }
}

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#1a3a6b] via-[#2251a3] to-[#73eafe] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 -left-10 w-64 h-64 bg-white/5 rounded-full" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Al día con nosotros
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">Noticias</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Entérate de las últimas novedades de Family Love.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        {noticias.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Todavía no hay noticias publicadas.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {noticias.map((n: any) => (
              <Link
                key={n.id}
                href={`/noticias/${n.id}`}
                className="group bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={n.imagen}
                    alt={n.titulo}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    📅 {n.fecha}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-extrabold text-gray-900 text-base mb-2 leading-tight group-hover:text-[#2251a3] transition-colors duration-300 line-clamp-2">
                    {n.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                    {n.resumen}
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-[#2251a3] font-bold text-sm group-hover:gap-2 transition-all duration-300">
                    Leer más <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
