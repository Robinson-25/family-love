import { Button } from "@/components/ui/button";
import React from "react";
import { Loader2 } from "lucide-react";

const ButtonLoading = () => {
  return (
    <Button disabled>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      Cargando...
    </Button>
  );
};

export default ButtonLoading;
