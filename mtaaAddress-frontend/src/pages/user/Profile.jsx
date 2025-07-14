import { useContext, useRef, useState, useEffect } from "react";
import { User, Mail, Lock, ImagePlus } from "lucide-react";
import UserContext from "../../context/UserContext";

export default function Profile() {
  const { user, updateUserProfile } = useContext(UserContext);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const dataToSend = {
      name: formData.name,
      email: formData.email,
    };

    if (formData.password) {
      dataToSend.password = formData.password;
    }

    const success = await updateUserProfile(dataToSend);
    if (success) alert("Profile updated!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-8">My Profile</h1>

      {/* Avatar Upload (UI only for now) */}
      <div className="flex flex-col sm:flex-row items-center mb-8 gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-accent shadow-md">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Avatar Preview" className="object-cover w-full h-full" />
          ) : (
            <User className="w-full h-full text-gray-300 p-4" />
          )}
        </div>
        <div>
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent/90 transition flex items-center gap-2"
          >
            <ImagePlus size={16} /> Upload Avatar
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={() => alert("Avatar change not implemented")}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full rounded-lg border bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full rounded-lg border bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full rounded-lg border bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 pr-4 py-2 w-full rounded-lg border bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
