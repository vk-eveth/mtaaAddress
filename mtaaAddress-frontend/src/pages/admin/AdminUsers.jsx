import { useState, useMemo, useContext } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search as SearchIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ViewUserModal from "../../components/admin/ViewUserModal";
import EditUserModal from "../../components/common/EditUserModal";
import AdminContext from "../../context/AdminContext";

const USERS_PER_PAGE = 5;

export default function AdminUsers() {
  const { users, loading } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Filter users by name, email, or role
  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.role?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  const openView = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const closeModals = () => {
    setSelectedUser(null);
    setIsViewOpen(false);
    setIsEditOpen(false);
  };

  const handleSave = (updatedUser) => {
    // Normally this would update backend or context
    closeModals();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Implement actual delete logic here if needed
      closeModals();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Manage Users</h1>

      {/* Search */}
      <div className="mb-4 flex items-center gap-2 max-w-sm">
        <SearchIcon className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-md">
          <table className="w-full text-left text-gray-800 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Role</th>
                <th className="px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">{user.role || "N/A"}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => openView(user)}
                        title="View"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openEdit(user)}
                        title="Edit"
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-4 items-center text-gray-700 dark:text-gray-300">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className={`p-2 rounded-md border ${
              page === 1
                ? "cursor-not-allowed border-gray-300 dark:border-gray-700 text-gray-400"
                : "hover:bg-accent hover:text-white border-gray-400"
            }`}
          >
            <ChevronLeft />
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className={`p-2 rounded-md border ${
              page === totalPages
                ? "cursor-not-allowed border-gray-300 dark:border-gray-700 text-gray-400"
                : "hover:bg-accent hover:text-white border-gray-400"
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Modals */}
      {isViewOpen && <ViewUserModal user={selectedUser} onClose={closeModals} />}
      {isEditOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={closeModals}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
