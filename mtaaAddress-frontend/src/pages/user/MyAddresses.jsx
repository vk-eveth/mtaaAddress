import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { Pencil, Trash2, Save, X, Share2 } from "lucide-react";
import AddressContext from "../../context/AddressContext";

export default function MyAddresses() {
  const { addresses, deleteAddress, updateAddress } = useContext(AddressContext);
  const [filter, setFilter] = useState("all");
  const [editingCode, setEditingCode] = useState(null);
  const [editFields, setEditFields] = useState({ landmark: "", place_type: "" });

   const filtered = addresses.filter((addr) =>
    filter === "all" ? true : addr.status === filter
  );
  
  const handleEditChange = (e) => {
    setEditFields({
      ...editFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (addr) => {
    if (addr.status === "approved") {
      alert("Approved addresses can only be edited by admin.");
      return;
    }
    setEditingCode(addr.code);
    setEditFields({ landmark: addr.landmark, placeType: addr.placeType });
  };


  const handleDelete = async (code) => {
    const addr = addresses.find((a) => a.code === code);
    if (!addr) return;

    if (confirm("Are you sure you want to delete this address?")) {
      const success = await deleteAddress(addr.id);
      if (!success) alert("Failed to delete address.");
    }
  };


  const getCardColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-50 border-green-300";
      case "pending": return "bg-yellow-50 border-yellow-300";
      case "rejected": return "bg-red-50 border-red-300";
      default: return "bg-white border-gray-200";
    }
  };

  const handleEditSave = async (code) => {
  const addr = addresses.find(a => a.code === code);
  if (!addr) return;

  const updated = await updateAddress(addr.id, {
    landmark: editFields.landmark,
    place_type: editFields.placeType,
  });

  if (updated) {
    setEditingCode(null);
  } else {
    alert("Failed to update address.");
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Addresses</h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-4">
        {["all", "approved", "pending", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No addresses found.</p>
      ) : (
        filtered.map((addr) => (
          <div
            key={addr.code}
            className={`p-4 rounded-lg shadow space-y-2 border ${getCardColor(addr.status)}`}
          >
            <div className="flex justify-between items-center">
              <p className="font-bold  text-black">
                {addr.code} - <span className="text-black">{addr.landmark}</span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(addr)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(addr.code)}
                  className="text-red-600 hover:underline text-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {editingCode === addr.code ? (
              <div className="space-y-2  text-black">
                <div>
                  <label className="text-sm">Landmark:</label>
                  <input
                    type="text"
                    name="landmark"
                    value={editFields.landmark || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm  text-black">Place Type:</label>
                  <input
                    type="text"
                    name="placeType"
                    value={editFields.place_type || ""}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingCode(null)}
                    className="px-3 py-2 bg-gray-200  text-black rounded-md"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    onClick={() => handleEditSave(addr.code)}
                    className="px-3 py-2 bg-green-600 text-white rounded-md"
                  >
                    <Save size={14} /> Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  <strong>Address-Code:</strong> {addr.code} <br />
                  <strong>Landmark:</strong> {addr.landmark} <br />
                  <strong>Type:</strong> {addr.place_type} <br />
                  <strong>Owner-Name:</strong> {addr.full_name} <br />
                  <strong>Status:</strong> {addr.status} <br />
                  <strong>Lat:</strong> {addr.latitude}, <strong>Lng:</strong> {addr.longitude}
                </p>

                {addr.status === "approved" && (
                  <div className="mt-2 space-y-2">
                    <QRCode
                      value={`http://localhost:5173/address/${addr.code}`}
                      size={80}
                    />
                    <div className="flex flex-col gap-1 text-sm">
                      <Link
                        to={`/address/${addr.code}`}
                        className="text-blue-600 underline"
                      >
                        View Details
                      </Link>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${addr.latitude},${addr.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 underline"
                      >
                        Get Directions
                      </a>
                      <button
                        onClick={() => navigator.clipboard.writeText(`http://localhost:5173/address/${addr.code}`)}
                        className="text-purple-600 underline flex items-center gap-1"
                      >
                        <Share2 size={14} /> Copy Share Link
                      </button>
                    </div>
                  </div>
                )}

                {addr.status !== "approved" && (
                  <p className="text-xs text-yellow-600">
                    QR, directions and sharing available after approval.
                  </p>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
