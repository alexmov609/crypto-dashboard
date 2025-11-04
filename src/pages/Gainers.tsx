import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useGainers } from "../hooks/useGainers";
import columns from "../components/gainers/TableColumns";

const Gainers = () => {
  const { gainers, losers, loading, error } = useGainers();
  // Sorting state for gainers table
  const [gainersSorting, setGainersSorting] = useState<SortingState>([]);
  const [gainersColumnFilters, setGainersColumnFilters] =
    useState<ColumnFiltersState>([]);

  // Sorting state for losers table
  const [losersSorting, setLosersSorting] = useState<SortingState>([]);
  const [losersColumnFilters, setLosersColumnFilters] =
    useState<ColumnFiltersState>([]);

  const gainersTable = useReactTable({
    data: gainers,
    columns,
    state: {
      sorting: gainersSorting,
      columnFilters: gainersColumnFilters,
    },
    onSortingChange: setGainersSorting,
    onColumnFiltersChange: setGainersColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const losersTable = useReactTable({
    data: losers,
    columns,
    state: {
      sorting: losersSorting,
      columnFilters: losersColumnFilters,
    },
    onSortingChange: setLosersSorting,
    onColumnFiltersChange: setLosersColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-auto p-6">
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        <div className="text-3xl md:text-4xl tracking-wide font-bold mb-8 text-center">
          Top Gainers & Losers
        </div>

        {/* Gainers Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            Top 10 Gainers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-800/50 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                {gainersTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="border border-gray-600 p-3 text-left font-semibold"
                        colSpan={header.colSpan}
                        key={header.id}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none flex items-center gap-2"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                            {header.column.getCanFilter() ? (
                              <input
                                type="text"
                                value={
                                  (header.column.getFilterValue() ??
                                    "") as string
                                }
                                onChange={(e) =>
                                  header.column.setFilterValue(e.target.value)
                                }
                                placeholder="Filter..."
                                className="mt-2 w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded text-white"
                              />
                            ) : null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {gainersTable.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="border border-gray-600 p-3" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Losers Table */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-red-400">
            Top 10 Losers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-800/50 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                {losersTable.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="border border-gray-600 p-3 text-left font-semibold"
                        colSpan={header.colSpan}
                        key={header.id}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none flex items-center gap-2"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                            {header.column.getCanFilter() ? (
                              <input
                                type="text"
                                value={
                                  (header.column.getFilterValue() ??
                                    "") as string
                                }
                                onChange={(e) =>
                                  header.column.setFilterValue(e.target.value)
                                }
                                placeholder="Filter..."
                                className="mt-2 w-full px-2 py-1 text-sm bg-gray-600 border border-gray-500 rounded text-white"
                              />
                            ) : null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {losersTable.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="border border-gray-600 p-3" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gainers;
