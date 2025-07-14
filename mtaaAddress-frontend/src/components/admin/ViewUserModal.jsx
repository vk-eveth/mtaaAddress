import React from "react";
import { X } from "lucide-react";

export default function ViewUserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          User Details
        </h2>

        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {user.status}
          </div>
          {/* Add more fields here if needed */}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-accent hover:bg-accent/90 text-white rounded-md font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
