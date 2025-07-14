import { useState, useContext, useMemo } from "react";
import AdminContext from "../../context/AdminContext";
import { Search, Download } from "lucide-react";

export default function AdminAddresses() {
  const { addresses, loading } = useContext(AdminContext);
  const [query, setQuery] = useState("");

  // Filtered addresses based on search
  const filtered = useMemo(() => {
    return addresses.filter((a) =>
      a.code.toLowerCase().includes(query.toLowerCase()) ||
      a.landmark.toLowerCase().includes(query.toLowerCase()) ||
      a.user.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, addresses]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-primary">📍 All Mtaa Addresses</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by user, code or landmark"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm shadow">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left p-4 text-sm font-semibold">Code</th>
              <th className="text-left p-4 text-sm font-semibold">User</th>
              <th className="text-left p-4 text-sm font-semibold">Landmark</th>
              <th className="text-left p-4 text-sm font-semibold">Status</th>
              <th className="text-left p-4 text-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-400">
                  Loading addresses...
                </td>
              </tr>
            ) : filtered.length ? (
              filtered.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4 text-sm font-medium text-primary">{a.code}</td>
                  <td className="p-4 text-sm">{a.user?.name || "Unknown"}</td>
                  <td className="p-4 text-sm">{a.landmark}</td>
                  <td className="p-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        a.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : a.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {new Date(a.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
