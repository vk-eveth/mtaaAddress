import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Home,
  MapPin,
  ClipboardList,
  CheckCircle,
  LogOut,
} from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function AdminSidebar({ open, setOpen }) {
  const location = useLocation();
  const { logoutUser } = useContext(AuthContext);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Addresses", href: "/admin/addresses", icon: MapPin },
    { name: "Approvals", href: "/admin/approvals", icon: CheckCircle },
    { name: "Reports", href: "/admin/reports", icon: ClipboardList },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay on mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-r border-gray-300 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:shadow-none shadow-lg`}
      >
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-2xl font-extrabold text-primary dark:text-white">
          MtaaAdmin
        </div>

        <nav className="mt-6 flex flex-col space-y-1 px-2">
          {navItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              to={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(href)
                  ? "bg-primary text-white"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
              onClick={() => setOpen(false)}
            >
              <Icon size={20} />
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto px-4 py-6">
          <button
            onClick={logoutUser}
            className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
