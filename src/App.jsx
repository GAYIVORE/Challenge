import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/lib/AuthProvider'; 

// Components
import Home from '@/pages/Home';
// Path updated to @/lib and included .jsx to ensure Vite finds it
import PageNotFound from '@/lib/PageNotFound.jsx'; 

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            {/* The app now loads Home directly without checking auth */}
            <Route path="/" element={<Home />} />
            
            {/* Fallback for any undefined routes */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App