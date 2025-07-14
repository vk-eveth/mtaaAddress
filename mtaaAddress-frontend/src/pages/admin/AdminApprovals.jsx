import { useContext, useState } from "react";
import AdminContext from "../../context/AdminContext";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const statusColors = {
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

export default function AdminApprovals() {
  const { addresses, setAddresses } = useContext(AdminContext);
  const { auth } = useContext(AuthContext);
  const [loadingId, setLoadingId] = useState(null); // holds ID of row being updated

  const pendingRequests = addresses.filter((a) => a.status === "pending");

  const updateStatus = async (id, newStatus) => {
    setLoadingId(id);
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8001/api/addresses/admin/status/${id}/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${auth.access}`,
          },
        }
      );

      toast.success(`Address ${newStatus.toUpperCase()} successfully`);

      setAddresses((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: res.data.status } : a
        )
      );
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${newStatus} address`);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-primary mb-6">🔎 Pending Address Approvals</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
            <tr>
              <th className="text-left px-6 py-3">Code</th>
              <th className="text-left px-6 py-3">Landmark</th>
              <th className="text-left px-6 py-3">Submitted By</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-center px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
                  No pending approvals found.
                </td>
              </tr>
            ) : (
              pendingRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 font-medium">{req.code}</td>
                  <td className="px-6 py-4">{req.landmark}</td>
                  <td className="px-6 py-4">{req.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4">
                    {new Date(req.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${statusColors[req.status]}`}
                    >
                      {req.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button
                      onClick={() => updateStatus(req.id, "approved")}
                      disabled={loadingId === req.id}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 disabled:opacity-50"
                    >
                      {loadingId === req.id ? "..." : (
                        <>
                          <CheckCircle size={16} className="inline-block mr-1" /> Approve
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, "rejected")}
                      disabled={loadingId === req.id}
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 disabled:opacity-50"
                    >
                      {loadingId === req.id ? "..." : (
                        <>
                          <XCircle size={16} className="inline-block mr-1" /> Reject
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
