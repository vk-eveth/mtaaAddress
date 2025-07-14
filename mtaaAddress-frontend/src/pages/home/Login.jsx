import { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import AuthFormWrapper from "../../components/auth/AuthFormWrapper";
import AuthContext from "../../context/AuthContext";


export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password); // Auth handled centrally
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-green-900 dark:via-green-700 dark:to-green-600 dark:text-white transition-colors duration-500 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <AuthFormWrapper title="Welcome Back to MtaaAddress">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-green-800 dark:text-yellow-300 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-green-600 dark:text-yellow-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-yellow-700 bg-gray-50 dark:bg-yellow-900 text-gray-900 dark:text-yellow-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-yellow-400 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-green-800 dark:text-yellow-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-green-600 dark:text-yellow-400" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your secure password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-yellow-700 bg-gray-50 dark:bg-yellow-900 text-gray-900 dark:text-yellow-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-yellow-400 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-700 text-white hover:bg-green-800 dark:bg-yellow-300 dark:text-green-900 dark:hover:bg-yellow-400 font-semibold py-3 rounded-lg shadow-lg transition-colors duration-300"
            >
              Log In
            </button>

            {/* Link */}
            <p className="text-center text-sm text-gray-700 dark:text-yellow-100">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-green-700 hover:text-green-800 dark:text-yellow-300 dark:hover:text-yellow-200 font-semibold transition"
              >
                Register here
              </Link>
            </p>
          </form>
        </AuthFormWrapper>
      </main>

      <Footer />
    </div>
  );
}
