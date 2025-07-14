import Sidebar from "../components/user/Sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f9fafb] text-gray-900 dark:bg-[#0d1117] dark:text-white transition-colors duration-500">
      <Sidebar />
      <main className="flex-1 px-6 py-10 sm:px-10 transition-all duration-500">
        {children}
      </main>
    </div>
  )
}