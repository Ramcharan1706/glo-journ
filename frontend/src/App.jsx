import { Suspense, lazy } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

// Context & Lib
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Pages (Lazy)
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const ClientDashboard = lazy(() => import("@/pages/ClientDashboard"));
const CoordinatorDashboard = lazy(() => import("@/pages/CoordinatorDashboard"));
const ManagerDashboard = lazy(() => import("@/pages/ManagerDashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const DisclaimerPage = lazy(() => import("@/pages/DisclaimerPage"));

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }
  return children;
};

const getDashboardPath = (role) => {
  switch (role) {
    case "client": return "/dashboard";
    case "coordinator": return "/coordinator";
    case "manager": return "/manager";
    case "admin": return "/admin";
    default: return "/";
  }
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" richColors />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <ClientDashboard />
                </ProtectedRoute>
              } />
              <Route path="/coordinator" element={
                <ProtectedRoute allowedRoles={["coordinator", "admin"]}>
                  <CoordinatorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/manager" element={
                <ProtectedRoute allowedRoles={["manager", "admin"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
