// src/components/Sidebar.jsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  PlusCircle,
  ListChecks,
  User,
  HelpCircle,
  LogOut,
  Menu
} from 'lucide-react'
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const navItems = [
  { name: 'Dashboard', icon: Home, href: '/user/dashboard' },
  { name: 'Create Address', icon: PlusCircle, href: '/user/create' },
  { name: 'My Addresses', icon: ListChecks, href: '/user/addresses' },
  { name: 'Profile', icon: User, href: '/user/profile' },
  { name: 'Help', icon: HelpCircle, href: '/user/help' },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { logoutUser } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 right-5 z-50 p-3 bg-primary text-white rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 z-40 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-xl font-extrabold text-primary dark:text-white">
          MtaaAddress
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 flex flex-col gap-1 px-4">
          {navItems.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              to={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                isActive(href)
                  ? 'bg-accent text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-accent/10 hover:text-accent'
              }`}
              onClick={() => setIsOpen(false)} // auto close on mobile
            >
              <Icon size={20} />
              <span>{name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={logoutUser}
            className="flex items-center gap-3 w-full text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
