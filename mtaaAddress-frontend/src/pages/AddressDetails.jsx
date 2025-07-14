import { useParams } from "react-router-dom";
import { mockAddresses } from "../data/mockAddresses";

export default function AddressDetails() {
  const { code } = useParams();
  const addr = mockAddresses.find((a) => a.code === code);

  if (!addr) return <p className="text-center text-red-500 mt-10">Not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Address: {addr.code}</h1>
      <p><strong>Landmark:</strong> {addr.landmark}</p>
      <p><strong>Status:</strong> {addr.status}</p>
      <p><strong>Coordinates:</strong> {addr.latitude}, {addr.longitude}</p>

      <iframe
        className="w-full h-64 rounded"
        loading="lazy"
        src={`https://maps.google.com/maps?q=${addr.latitude},${addr.longitude}&hl=es&z=15&output=embed`}
      ></iframe>

      <a
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        href={`https://www.google.com/maps/dir/?api=1&destination=${addr.latitude},${addr.longitude}`}
        target="_blank"
      >
        Get Directions
      </a>
    </div>
  );
}