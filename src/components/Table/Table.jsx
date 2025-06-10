import React from "react";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({
  tableName = "",
  columns = [],
  rows = [],
  search = "",
  setSearch,
  setPage,
  setPageSize,
  page,
  pageSize,
  pagination,
  handleDelete,
  handleEdit,
}) => {
  const { palette } = useTheme();
  const isDarkMode = palette.mode === "dark";

  return (
    <div
      className={`max-w-6xl mx-auto p-4 shadow rounded-xl ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between">
        {tableName && (
          <h1 className="text-xl font-semibold mb-4">{tableName}</h1>
        )}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/5"
        />
      </div>

      <div className="overflow-x-auto mt-4">
        <table
          className={`min-w-full text-left border ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <thead>
            <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
              {columns.map((column, colIndex) => (
                <th
                  key={colIndex}
                  className={`px-4 py-2 border font-medium ${
                    column.accessor === "isActive" ||
                    column.accessor === "edit" ||
                    column.accessor === "delete"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-4 py-2 border ${
                        column.accessor === "isActive" ||
                        column.accessor === "edit" ||
                        column.accessor === "delete"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {column.accessor === "isActive" ? (
                        <input
                          type="checkbox"
                          checked={!!row[column.accessor]}
                          readOnly
                          className="w-4 h-4 cursor-default"
                        />
                      ) : column.accessor === "edit" ? (
                        <EditIcon
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                          onClick={() => handleEdit(row)}
                        />
                      ) : column.accessor === "delete" ? (
                        <DeleteIcon
                          className="cursor-pointer text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(row)}
                        />
                      ) : column.render ? (
                        column.render(row)
                      ) : (
                        row[column.accessor] ?? "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 gap-3">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <label htmlFor="rowsPerPage" className="text-sm">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
              setPage(0);
            }}
            className={`border rounded-md px-2 py-1 text-sm ${
              isDarkMode
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className={`px-3 py-1 rounded-md disabled:opacity-50 ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            ‹
          </button>
          <span className="text-sm">
            Page {page + 1} of {pagination?.totalPages || 1}
          </span>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, pagination?.totalPages - 1))
            }
            disabled={page >= (pagination?.totalPages || 1) - 1}
            className={`px-3 py-1 rounded-md disabled:opacity-50 ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
