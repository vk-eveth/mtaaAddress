import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-gray-200 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">MtaaAddress</h2>
          <p className="text-gray-300 max-w-sm">
            Your trusted digital address system connecting communities across East Africa.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-green-300 transition">Home</a></li>
            <li><a href="/how-it-works" className="hover:text-green-300 transition">How It Works</a></li>
            <li><a href="/create-address" className="hover:text-green-300 transition">Create Address</a></li>
            <li><a href="/faq" className="hover:text-green-300 transition">FAQ</a></li>
            <li><a href="/contact" className="hover:text-green-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/privacy" className="hover:text-green-300 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-green-300 transition">Terms of Service</a></li>
            <li><a href="/support" className="hover:text-green-300 transition">Support</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} MtaaAddress. All rights reserved.
      </div>
    </footer>
  );
}
