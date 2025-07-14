import React, { useContext, useState, useMemo } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Download, BarChart3 } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import AdminContext from "../../context/AdminContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Report() {
  const { users, addresses, loading } = useContext(AdminContext);
  const [selectedRange, setSelectedRange] = useState("6 Months");

  const totalUsers = users.length;
  const totalAddresses = addresses.length;
  const pendingCount = addresses.filter((a) => a.status === "pending").length;

  const mockChartData = useMemo(() => {
    // Optional: Use real dates from addresses to simulate a chart
    // For now, we'll keep using mock data
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Addresses Created",
          data: [5, 12, 8, 14, 10, 7], // Later replace with real analytics
          backgroundColor: "#22c55e",
        },
      ],
    };
  }, [addresses]);

  const handleExport = () => {
    alert("📄 Exported report as PDF (feature coming soon!)");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">📊 Address Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Analyze trends over time and export insights.</p>
        </div>

        <div className="flex gap-3">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md bg-white dark:bg-gray-800 dark:text-white"
          >
            <option>Last 7 Days</option>
            <option>30 Days</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4 text-lg font-semibold text-accent">
          <BarChart3 size={20} /> Trend of Address Submissions
        </div>
        <Bar data={mockChartData} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400 mb-1">🧍‍♂️ Total Users</p>
          <p className="text-2xl font-bold text-primary">
            {loading ? "Loading..." : totalUsers}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400 mb-1">📌 Total Addresses</p>
          <p className="text-2xl font-bold text-green-600">
            {loading ? "Loading..." : totalAddresses}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400 mb-1">⏳ Pending Approvals</p>
          <p className="text-2xl font-bold text-yellow-500">
            {loading ? "Loading..." : pendingCount}
          </p>
        </div>
      </div>
    </div>
  );
}
