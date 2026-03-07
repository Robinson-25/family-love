"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/User/user";
import { createColumnHelper } from "@tanstack/react-table";
import { CircleDollarSign, Shield, UserPlus } from "lucide-react";
import ActionsColumn from "./_components/ActionsColumn/actions-column";

const columnHelper = createColumnHelper<User>();

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
          onCheckedChange={(value) => row.toggleSelected()}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("username", {
    id: "Nombre de Usuario",
    header: () => <span>Nombre de Usuario</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("email", {
    id: "Correo Electrónico",
    header: () => <span>Correo Electrónico</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("role", {
    id: "Permisos",
    header: () => <span>Permisos</span>,
    cell: (info) => (
      <p
        className={`px-4 py-1 rounded-full w-fit flex items-center gap-1 ${
          info.getValue() === "customer"
            ? "bg-green-600 text-green-300"
            : info.getValue() === "admin"
            ? "bg-gold-hr-dark text-[#faefcf]"
            : info.getValue() === "colaborator"
            ? "bg-teal-800 text-teal-300"
            : ""
        }`}
      >
        {info.getValue() === "customer" ? (
          <CircleDollarSign className="w-3 h-3" />
        ) : info.getValue() === "admin" ? (
          <Shield className="w-3 h-3" />
        ) : info.getValue() === "colaborator" ? (
          <UserPlus className="w-3 h-3" />
        ) : (
          <></>
        )}
        <span>{info.getValue()}</span>
      </p>
    ),
  }),
  columnHelper.display({
    id: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
  }),
];
