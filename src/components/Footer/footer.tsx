import Link from "next/link";
import { MapPin } from "lucide-react";

const Footer = async () => {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-sm pb-6 text-zinc-900 dark:text-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-28 py-12">

        {/* DIRECCIÓN */}
        <div className="text-center max-w-[300px] md:max-w-[200px] lg:max-w-[400px]">
          <p className="font-semibold tracking-widest uppercase mb-4">
            Nuestra Dirección
          </p>
          <div className="flex flex-col gap-2 items-center text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0271bd]" strokeWidth={1.5} />
              <span>Family Love</span>
            </div>
          </div>
        </div>

        {/* REDES SOCIALES */}
        <div className="text-center max-w-[300px] md:max-w-[200px] lg:max-w-[400px]">
          <p className="font-semibold tracking-widest uppercase mb-4">
            Síguenos
          </p>
          <div className="flex flex-col gap-3 items-center">
            <Link href="https://www.facebook.com/share/1Wb5LaxpDq/" target="_blank" className="flex items-center gap-2 hover:text-[#0271bd] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33V21.88C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              Facebook
            </Link>
            <Link href="https://www.instagram.com/familylove_oficial?igsh=ZmhucWh6MG93Ym1i" target="_blank" className="flex items-center gap-2 hover:text-[#6923b7] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Instagram
            </Link>
            <Link href="https://www.tiktok.com/@familyloveperu?_r=1&_t=ZS-949Ax0fMLfp" target="_blank" className="flex items-center gap-2 hover:text-[#0271bd] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z"/>
              </svg>
              TikTok
            </Link>
            <Link href="https://wa.me/51991512267" target="_blank" className="flex items-center gap-2 hover:text-[#0271bd] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </Link>
            <Link href="mailto:asociacionfamilylove@gmail.com" className="flex items-center gap-2 hover:text-[#0271bd] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              asociacionfamilylove@gmail.com
            </Link>
          </div>
        </div>

        {/* LINKS RÁPIDOS */}
        <div className="text-center max-w-[300px] md:max-w-[200px] lg:max-w-[400px]">
          <p className="font-semibold tracking-widest uppercase mb-4">
            Links Rápidos
          </p>
          <div className="flex flex-col gap-3 items-center">
            <Link href="/" className="hover:text-[#0271bd] transition-colors duration-300">
              Inicio
            </Link>
            <Link href="/programas" className="hover:text-[#0271bd] transition-colors duration-300">
              Programas
            </Link>
            <Link href="/proyecto" className="hover:text-[#0271bd] transition-colors duration-300">
              Proyectos
            </Link>
            <Link href="/quienes-somos" className="hover:text-[#0271bd] transition-colors duration-300">
              Quiénes Somos
            </Link>
            <Link href="/voluntariado" className="hover:text-[#0271bd] transition-colors duration-300">
              Voluntariado
            </Link>
          </div>
        </div>

      </div>

      <hr className="w-full border-t-zinc-300 dark:border-t-zinc-800" />
      <div className="pt-6">
        <div className="text-center px-6">
          <p>Hecho con ❤️ por Family Love 2026</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;