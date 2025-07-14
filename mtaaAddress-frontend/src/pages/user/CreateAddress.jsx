import { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { MapPin, Landmark, Save, Info, Fingerprint, User, Briefcase, FileText } from "lucide-react";
import { motion } from "framer-motion";
import LocationMap from "../../components/maps/LocationMap";
import AddressContext from "../../context/AddressContext";

export default function CreateAddress() {
  const { createAddress } = useContext(AddressContext);
  const [marker, setMarker] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: -3.3869,
    longitude: 36.683,
    zoom: 14,
  });

  const [form, setForm] = useState({
    fullName: "",
    nationalId: "",
    placeType: "",
    landmark: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewport({ latitude, longitude, zoom: 16 });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, nationalId, placeType, landmark, description } = form;

    if (!marker || !fullName || !nationalId || !placeType || !landmark) {
      toast.error("Please fill all required fields and select a location.");
      return;
    }

    const submittingToast = toast.loading("Submitting...");

    try {
      await createAddress({
        full_name: fullName,
        national_id: nationalId,
        place_type: placeType,
        landmark,
        description,
        latitude: marker.latitude,
        longitude: marker.longitude,
      });

      toast.dismiss(submittingToast);
      toast.success("Address submitted successfully!");

      // Optionally reset form and marker
      setForm({
        fullName: "",
        nationalId: "",
        placeType: "",
        landmark: "",
        description: "",
      });
      setMarker(null);
    } catch (error) {
      toast.dismiss(submittingToast);
      toast.error("Failed to submit address. Try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h1 className="text-3xl font-extrabold text-green-800 dark:text-yellow-300 flex items-center gap-2 drop-shadow">
          <MapPin size={28} /> Create Mtaa Address
        </h1>
        <div className="flex items-center text-sm text-gray-500 dark:text-yellow-100 gap-2">
          <Info size={16} /> Provide full info, pin location and submit.
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Map Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative h-[420px] w-full rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <LocationMap
            marker={marker}
            setMarker={setMarker}
            viewport={viewport}
            setViewport={setViewport}
            animateDrop={true}
          />
        </motion.div>

        {/* Form Panel */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-6 w-full"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800 dark:text-yellow-100">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your legal full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800 dark:text-yellow-100">
                National ID Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Fingerprint className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="nationalId"
                  required
                  value={form.nationalId}
                  onChange={handleChange}
                  placeholder="e.g. 199922344567890001"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800 dark:text-yellow-100">
                Place Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="placeType"
                  required
                  value={form.placeType}
                  onChange={handleChange}
                  placeholder="e.g. Residential Home, Business, Shop, etc."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800 dark:text-yellow-100">
                Landmark <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Landmark className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="landmark"
                  required
                  value={form.landmark}
                  onChange={handleChange}
                  placeholder="e.g. Near Mt. Meru Pharmacy"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-800 dark:text-yellow-100">
                Additional Notes <span className="text-xs">(optional)</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. Contact number, gate color, floor number, etc."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow hover:shadow-lg transition transform hover:scale-[1.02] w-full"
            >
              <Save size={18} /> Submit
            </button>
          </div>
        </motion.form>
      </div>

      {/* Live Preview Summary */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-yellow-100 mb-2">Live Preview</h2>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <li><strong>Full Name:</strong> {form.fullName || "N/A"}</li>
          <li><strong>National ID:</strong> {form.nationalId || "N/A"}</li>
          <li><strong>Place Type:</strong> {form.placeType || "N/A"}</li>
          <li><strong>Landmark:</strong> {form.landmark || "N/A"}</li>
          <li><strong>Description:</strong> {form.description || "(none)"}</li>
          <li><strong>Latitude:</strong> {marker?.latitude ?? "N/A"}</li>
          <li><strong>Longitude:</strong> {marker?.longitude ?? "N/A"}</li>
        </ul>
      </div>
    </div>
  );
}
