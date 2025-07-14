import { useContext, useMemo } from "react";
import { BarChart3, MapPin, UserCircle2, Plus, CheckCircle2, Clock3, XCircle } from "lucide-react";
import AddressContext from "../../context/AddressContext";
import UserContext from "../../context/UserContext";

export default function Dashboard() {
  const { addresses, loading, error } = useContext(AddressContext);
  const { user } = useContext(UserContext);
  // Calculate stats dynamically from addresses
  const stats = useMemo(() => {
    const total = addresses.length;
    const approved = addresses.filter((a) => a.status === "approved").length;
    const pending = addresses.filter((a) => a.status === "pending").length;
    const rejected = addresses.filter((a) => a.status === "rejected").length;

    return { total, approved, pending, rejected };
  }, [addresses]);

  // Get recent 5 submissions sorted by created_at descending (assuming backend returns sorted)
  // Just in case, sort here:
  const recentAddresses = useMemo(() => {
    return [...addresses]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  }, [addresses]);

  const statusStyles = {
    approved: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <div className="flex flex-col gap-16">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-4xl font-extrabold text-[#087f5b] dark:text-[#3ddc97] drop-shadow mb-2">
          Karibu <span className="capitalize">{user?.name || "mgeni"}</span> 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here’s your MtaaAddress activity summary.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total" value={stats.total} icon={<BarChart3 />} color="gray" />
        <StatCard label="Approved" value={stats.approved} icon={<CheckCircle2 />} color="green" />
        <StatCard label="Pending" value={stats.pending} icon={<Clock3 />} color="yellow" />
        <StatCard label="Rejected" value={stats.rejected} icon={<XCircle />} color="red" />
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ActionCard
            title="Create Address"
            icon={<Plus size={32} className="text-green-600 dark:text-[#3ddc97]" />}
            href="/user/create"
          />
          <ActionCard
            title="My Addresses"
            icon={<MapPin size={32} className="text-indigo-600 dark:text-[#3ddc97]" />}
            href="/user/addresses"
          />
          <ActionCard
            title="Profile Settings"
            icon={<UserCircle2 size={32} className="text-purple-600 dark:text-[#3ddc97]" />}
            href="/user/profile"
          />
        </div>
      </section>

      {/* Recent Submissions */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Recent Submissions</h2>
        {loading && <p>Loading your addresses...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {recentAddresses.length === 0 && <p>No submissions found.</p>}
            {recentAddresses.map(({ id, code, status, landmark }) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-[#161b22] rounded-xl shadow hover:shadow-lg p-5 transition-all duration-300"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{code}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{landmark}</p>
                </div>
                <span
                  className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-semibold rounded-full ${
                    statusStyles[status] || ""
                  }`}
                >
                  {status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#161b22] shadow-md hover:shadow-lg transition">
      <div
        className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900 text-${color}-700 dark:text-${color}-300`}
      >
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-gray-800 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function ActionCard({ title, icon, href }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center text-center gap-3 p-6 bg-white dark:bg-[#161b22] rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
    >
      {icon}
      <p className="text-md font-semibold text-gray-800 dark:text-white">{title}</p>
    </a>
  );
}
