import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import ForecastZonePanel from "./components/ForecastZonePanel";
import SocialPulseView from "./components/SocialPulseView";

const queryClient = new QueryClient();

// AuthGuard must be used inside BrowserRouter, so wrap it in a component
function AuthWrapper() {
  const location = useLocation();
  const isAuth =
    localStorage.getItem("isAuthenticated") === "true" ||
    sessionStorage.getItem("isAuthenticated") === "true";
  if (!isAuth && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forecast" element={<ForecastZonePanel />} />
      <Route path="/social" element={<SocialPulseView />} />
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Main App
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
