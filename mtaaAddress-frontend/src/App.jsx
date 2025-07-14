// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./components/utils/ScrollToTop";
import PageTransitionWrapper from "./components/utils/PageTransitionWrapper";
import { RequireAuth } from "./utils/ProtectedRoute";

// Public pages
const HomePage = lazy(() => import("./pages/home/HomePage"));
const Login = lazy(() => import("./pages/home/Login"));
const Register = lazy(() => import("./pages/home/Register"));
const Contact = lazy(() => import("./pages/home/Contact"));
const FAQPage = lazy(() => import("./pages/home/FAQPage"));
const HowItWorksPage = lazy(() => import("./pages/home/HowItWorksPage"));

// User pages
import DashboardLayout from "./layouts/DashboardLayout";
const Dashboard = lazy(() => import("./pages/user/Dashboard"));
const CreateAddress = lazy(() => import("./pages/user/CreateAddress"));
const MyAddresses = lazy(() => import("./pages/user/MyAddresses"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Help = lazy(() => import("./pages/user/Help"));

// Admin pages
import AdminLayout from "./components/admin/AdminLayout";
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminAddresses = lazy(() => import("./pages/admin/AdminAddresses"));
const AdminApprovals = lazy(() => import("./pages/admin/AdminApprovals"));
const Report = lazy(() => import("./pages/admin/Report"));

import AddressDetails from "./pages/AddressDetails";
import { AddressProvider } from "./context/AddressContext";
import { AdminProvider } from "./context/AdminContext";

export default function App() {
  return (
    <>
     <ScrollToTop />
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="/homepage" element={<PageTransitionWrapper><HomePage /></PageTransitionWrapper>} />
            <Route path="/login" element={<PageTransitionWrapper><Login /></PageTransitionWrapper>} />
            <Route path="/register" element={<PageTransitionWrapper><Register /></PageTransitionWrapper>} />
            <Route path="/how-it-works" element={<PageTransitionWrapper><HowItWorksPage /></PageTransitionWrapper>} />
            <Route path="/contact" element={<PageTransitionWrapper><Contact /></PageTransitionWrapper>} />
            <Route path="/faq" element={<PageTransitionWrapper><FAQPage /></PageTransitionWrapper>} />
         </Routes>

          <AddressProvider>
            <Routes>
              {/* User Routes (Protected) */}
              <Route path="/user/dashboard" element={
                <RequireAuth allowedRole="user">
                  <DashboardLayout><PageTransitionWrapper><Dashboard /></PageTransitionWrapper></DashboardLayout>
                </RequireAuth>
              } />
              <Route path="/user/create" element={
                <RequireAuth allowedRole="user">
                  <DashboardLayout><PageTransitionWrapper><CreateAddress /></PageTransitionWrapper></DashboardLayout>
                </RequireAuth>
              } />
              <Route path="/user/addresses" element={
                <RequireAuth allowedRole="user">
                  <DashboardLayout><PageTransitionWrapper><MyAddresses /></PageTransitionWrapper></DashboardLayout>
                </RequireAuth>
              } />
              <Route path="/user/profile" element={
                <RequireAuth allowedRole="user">
                  <DashboardLayout><PageTransitionWrapper><Profile /></PageTransitionWrapper></DashboardLayout>
                </RequireAuth>
              } />
              <Route path="/user/help" element={
                <RequireAuth allowedRole="user">
                  <DashboardLayout><PageTransitionWrapper><Help /></PageTransitionWrapper></DashboardLayout>
                </RequireAuth>
              } />
            </Routes>
          </AddressProvider>

          <AdminProvider>
            <Routes>
            {/* Admin Routes (Protected) */}
              <Route path="/admin/dashboard" element={
                <RequireAuth allowedRole="admin">
                  <AdminLayout><PageTransitionWrapper><AdminDashboard /></PageTransitionWrapper></AdminLayout>
                </RequireAuth>
              } />
              <Route path="/admin/users" element={
                <RequireAuth allowedRole="admin">
                  <AdminLayout><PageTransitionWrapper><AdminUsers /></PageTransitionWrapper></AdminLayout>
                </RequireAuth>
              } />
              <Route path="/admin/addresses" element={
                <RequireAuth allowedRole="admin">
                  <AdminLayout><PageTransitionWrapper><AdminAddresses /></PageTransitionWrapper></AdminLayout>
                </RequireAuth>
              } />
              <Route path="/admin/approvals" element={
                <RequireAuth allowedRole="admin">
                  <AdminLayout><PageTransitionWrapper><AdminApprovals /></PageTransitionWrapper></AdminLayout>
                </RequireAuth>
              } />
              <Route path="/admin/reports" element={
                <RequireAuth allowedRole="admin">
                  <AdminLayout><PageTransitionWrapper><Report /></PageTransitionWrapper></AdminLayout>
                </RequireAuth>
              } />
           </Routes>
          </AdminProvider>

         <Routes>
            {/* Shared (Accessible to all) */}
            <Route path="/address/:code" element={<AddressDetails />} />

            {/* 404 Route */}
            <Route path="*" element={<div className="p-8 text-xl text-red-600">404 - Page Not Found</div>} />
          </Routes>
       </Suspense>
    </>
  );
}