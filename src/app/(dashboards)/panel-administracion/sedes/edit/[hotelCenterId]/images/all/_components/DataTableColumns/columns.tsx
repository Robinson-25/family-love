"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Image as ImageType } from "@/types/Image/image";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import ActionsColumn from "./_components/ActionsColumn/actions-column";

const columnHelper = createColumnHelper<ImageType>();

export const columns = [
  columnHelper.display({
    id: "Seleccionar",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected()}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected()}
        />
      );
    },
  }),
  columnHelper.accessor("url", {
    id: "Imagen",
    header: () => <span>Imagen</span>,
    cell: (info) => {
      return (
        <Image
          className="w-20 h-20"
          src={info.getValue()}
          width={150}
          height={150}
          alt="Imagen de la sede"
        />
      );
    },
  }),

  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
  }),
];
