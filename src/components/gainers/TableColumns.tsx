import type { ColumnDef } from "@tanstack/react-table";
import type { Ticker } from "../../types/Ticker.types";

// Define table columns for crypto data
const columns: ColumnDef<Ticker>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: (info) => {
      const value = info.getValue() as string;
      return value.replace("USDT", "");
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "lastPrice",
    header: "Price",
    cell: (info) => {
      const value = info.getValue() as string;
      return `$${parseFloat(value).toFixed(8)}`;
    },
    sortingFn: (rowA, rowB) => {
      const a = parseFloat(rowA.getValue("lastPrice") as string);
      const b = parseFloat(rowB.getValue("lastPrice") as string);
      return a - b;
    },
    enableSorting: true,
  },
  {
    accessorKey: "priceChange",
    header: "Change",
    cell: (info) => {
      const value = parseFloat(info.getValue() as string);
      return (
        <span className={value >= 0 ? "text-green-400" : "text-red-400"}>
          ${value.toFixed(8)}
        </span>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = parseFloat(rowA.getValue("priceChange") as string);
      const b = parseFloat(rowB.getValue("priceChange") as string);
      return a - b;
    },
    enableSorting: true,
  },
  {
    accessorKey: "priceChangePercent",
    header: "Change %",
    cell: (info) => {
      const value = parseFloat(info.getValue() as string);
      return (
        <span className={value >= 0 ? "text-green-400" : "text-red-400"}>
          {value.toFixed(2)}%
        </span>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = parseFloat(rowA.getValue("priceChangePercent") as string);
      const b = parseFloat(rowB.getValue("priceChangePercent") as string);
      return a - b;
    },
    enableSorting: true,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: (info) => {
      const value = parseFloat(info.getValue() as string);
      return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
    },
    sortingFn: (rowA, rowB) => {
      const a = parseFloat(rowA.getValue("volume") as string);
      const b = parseFloat(rowB.getValue("volume") as string);
      return a - b;
    },
    enableSorting: true,
  },
];

export default columns;
