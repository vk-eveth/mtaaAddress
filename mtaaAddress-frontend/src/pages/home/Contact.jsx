import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission (replace with real API call later)
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <Navbar />
         <main className="min-h-screen bg-gray-50 py-16 px-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
        Get in Touch
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <section className="space-y-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Contact Information
          </h2>
          <p className="text-gray-700">
            Have questions or want to collaborate? Reach out using the
            details below or send a message using the form.
          </p>

          <div className="flex items-center gap-4 text-green-700">
            <FaMapMarkerAlt className="text-xl" />
            <span>Arusha, Tanzania</span>
          </div>
          <div className="flex items-center gap-4 text-green-700">
            <FaPhone className="text-xl" />
            <a href="tel:+255123456789" className="hover:underline">
              +255 123 456 789
            </a>
          </div>
          <div className="flex items-center gap-4 text-green-700">
            <FaEnvelope className="text-xl" />
            <a href="mailto:info@mtaaaddress.tz" className="hover:underline">
              info@mtaaaddress.tz
            </a>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="text-gray-700 font-semibold">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your full name"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-semibold">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-semibold">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write your message here..."
                required
              ></textarea>
            </label>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Send Message
            </button>

            {status === "success" && (
              <p className="text-green-700 font-semibold mt-4">
                Thanks for reaching out! We will get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 font-semibold mt-4">
                Please fill all the fields before submitting.
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
    <Footer />
    </div>
  );
}
