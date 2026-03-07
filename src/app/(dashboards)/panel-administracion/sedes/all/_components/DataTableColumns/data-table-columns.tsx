"use client";

import React from "react";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import ActionsColumn from "./_components/ActionsColumn/actions-column";

const columnHelper = createColumnHelper<HotelCenter>();

export const columns = [
  columnHelper.display({
    id: "Seleccionar",
    header: ({ table }) => (
      <Checkbox
        className="rounded-[4px]"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="rounded-[4px]"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("name", {
    id: "Nombre",
    header: () => <span>Nombre</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("address", {
    id: "Dirección",
    header: () => <span>Dirección</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
    enableHiding: false,
    enableSorting: false,
  }),
];
