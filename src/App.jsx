import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from '@/lib/PageNotFound'; // Adjusted path to a standard pages directory
import { AuthProvider, useAuth } from '@/contexts/AuthProvider'; // Pointing to your new context
import Home from '@/pages/Home';
import Login from '@/pages/Login'; // You'll need a standard Login page now

const AuthenticatedApp = () => {
  const { 
    isLoadingAuth, 
    isLoadingPublicSettings, 
    authError, 
    isAuthenticated 
  } = useAuth();

  // 1. Loading State
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. Handle Authentication Guard
  // If there's an auth error or the user isn't logged in, send them to /login
  if (authError?.type === 'auth_required' || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. Main Application Routes
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add your other custom routes here */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            {/* Login route is outside the AuthenticatedApp wrapper */}
            <Route path="/login" element={<Login />} />
            
            {/* All other routes are protected by AuthenticatedApp */}
            <Route path="/*" element={<AuthenticatedApp />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
