import { useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import * as XLSX from "xlsx";

const PAGE_SIZE = 10;

export default function AccountTable() {
  const data = useSelector((state) => state.accounts.list || []);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  // Global Search (SAFE)
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Sorting (Stable & Correct)
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    const { key, direction } = sortConfig;

    return [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  //  Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, page]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  //Excel Export (Filtered + Sorted)
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Accounts");
    XLSX.writeFile(wb, "accounts.xlsx");
  };


  //Sort handler
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc"
        };
      }
      return { key, direction: "asc" };
    });
  };

  
  return (
    <div className="mt-6 overflow-x-auto">
      {/* Search + Download */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-3">
        <input
          className="border p-2 rounded w-full sm:w-64"
          placeholder="Global search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={exportExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            {[
              "accountName",
              "email",
              "phone",
              "website",
              "industry",
              "status",
              "remark"
            ].map((col) => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                className="p-2 cursor-pointer select-none"
              >
                {col.toUpperCase()}
                {sortConfig?.key === col &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-2">{row.accountName}</td>
                <td className="p-2">{row.email}</td>
                <td className="p-2">{row.phone}</td>
                <td className="p-2">{row.website}</td>
                <td className="p-2">{row.industry}</td>
                <td className="p-2">{row.status}</td>
                <td className="p-2">{row.remark}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {Array.from({
          length: Math.ceil(sortedData.length / PAGE_SIZE)
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
