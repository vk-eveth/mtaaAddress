import { useContext } from "react";
import {
  Users,
  MapPin,
  Clock,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../../layouts/AdminLayout";
import AdminContext from "../../context/AdminContext";

export default function AdminDashboard() {
  const { users, addresses, loading } = useContext(AdminContext);

  const totalUsers = users.length;
  const totalAddresses = addresses.length;
  const pendingApprovals = addresses.filter(a => a.status === "pending").length;

  // Recent activity (take latest 5)
  const recentActivities = addresses.slice(0, 5).map((a, i) => ({
    id: i + 1,
    user: a.user?.name || "Unknown",
    action: `submitted address ${a.id}`,
    time: new Date(a.created_at).toLocaleString(),
  }));

  // Static data for trend chart (replace with real trend data later if needed)
  const userTrends = [
    { day: "Mon", users: 20 },
    { day: "Tue", users: 35 },
    { day: "Wed", users: 28 },
    { day: "Thu", users: 40 },
    { day: "Fri", users: 30 },
    { day: "Sat", users: 50 },
    { day: "Sun", users: 45 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="mt-4 md:mt-0 text-gray-600 dark:text-gray-400">
          {new Date().toLocaleString()}
        </div>
      </header>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading admin data...</p>
      ) : (
        <>
          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total Users"
              value={totalUsers}
              icon={<Users size={36} className="text-indigo-600" />}
              bg="bg-indigo-100"
              text="text-indigo-700"
            />
            <StatCard
              title="Total Addresses"
              value={totalAddresses}
              icon={<MapPin size={36} className="text-green-600" />}
              bg="bg-green-100"
              text="text-green-700"
            />
            <StatCard
              title="Pending Approvals"
              value={pendingApprovals}
              icon={<Clock size={36} className="text-yellow-600" />}
              bg="bg-yellow-100"
              text="text-yellow-700"
            />
            <StatCard
              title="Recent Activity"
              value={recentActivities.length}
              icon={<Activity size={36} className="text-purple-600" />}
              bg="bg-purple-100"
              text="text-purple-700"
            />
          </section>

          {/* Trends Chart */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-6">User Signups Last 7 Days</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={userTrends} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>

          {/* Recent Activities */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map(({ id, user, action, time }) => (
                <li key={id} className="py-3 flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{user}</span> {action}
                  </div>
                  <time className="text-sm text-gray-500 dark:text-gray-400">{time}</time>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

// Reusable StatCard component
function StatCard({ title, value, icon, bg, text }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl p-6 shadow-md ${bg} ${text} hover:scale-105 transition-transform cursor-default`}
    >
      <div className="p-3 bg-white rounded-full">{icon}</div>
      <div>
        <p className="text-xl font-semibold">{value.toLocaleString()}</p>
        <p className="text-sm font-medium">{title}</p>
      </div>
    </div>
  );
}
