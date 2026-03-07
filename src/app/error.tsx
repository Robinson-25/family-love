"use client"; // Error components must be Client Components

import { Ban } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <Ban className="" strokeWidth={1.8} />
      <h2>Algo salió mal!</h2>
      <button
        onClick={() => reset()}
        className="px-6 h-10 bg-white text-black rounded-md text-sm"
      >
        Vuelve a intentarlo
      </button>
    </div>
  );
}
