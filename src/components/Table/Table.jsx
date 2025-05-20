import React, { useState, useMemo } from "react";
import { useTheme } from "@mui/material/styles";

const data = [
  { name: "India", code: "IN", population: 1324171354 },
  { name: "China", code: "CN", population: 1403500365 },
  { name: "Italy", code: "IT", population: 60483973 },
  { name: "United States", code: "US", population: 327167434 },
  { name: "Canada", code: "CA", population: 37602103 },
  { name: "Australia", code: "AU", population: 25475400 },
  { name: "Germany", code: "DE", population: 83019200 },
  { name: "Ireland", code: "IE", population: 4857000 },
  { name: "Mexico", code: "MX", population: 126577691 },
  { name: "Japan", code: "JP", population: 126317000 },
  { name: "France", code: "FR", population: 67022000 },
  { name: "Brazil", code: "BR", population: 210147125 },
];

const Table = ({tableName}) => {
  const { palette } = useTheme();
  const isDarkMode = palette.mode === "dark";

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div
      className={`max-w-4xl mx-auto p-4 shadow rounded-xl ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">{tableName}</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          className={`border rounded-md px-3 py-2 w-1/3
            ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 placeholder-gray-400 text-black"
                : "bg-white border-gray-300 text-black"
            }
            focus:outline-none
            focus:ring-0
            focus:border-gray-700
          `}
        />
      </div>

      <div className="overflow-x-auto">
        <table
          className={`min-w-full text-left border ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <thead>
            <tr className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Population</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={
                    isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                  }
                >
                  <td className="px-4 py-2 border">{row.name}</td>
                  <td className="px-4 py-2 border">{row.code}</td>
                  <td className="px-4 py-2 border">
                    {row.population.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 gap-3">
        {/* Rows per page dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="rowsPerPage" className="text-sm">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setPage(0);
            }}
            className={`border rounded-md px-2 py-1 text-sm ${
              isDarkMode
                ? "bg-gray-900  text-white"
                : "bg-white border-gray-300 text-black"
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
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page >= totalPages - 1}
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
