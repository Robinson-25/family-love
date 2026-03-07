import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-center">
        <p className="text-6xl font-bold">404</p>
        <h2 className="text-sm">Página no encontrada</h2>
        <Link
          href={`/`}
          className="mt-4 text-sm flex items-center gap-2 border-b border-transparent hover:border-black dark:hover:border-white transition-all duration-100"
        >
          Volver al Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
