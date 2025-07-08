import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import BottomNavigation from "./components/navigation/BottomNavigation";
import Dashboard from "./pages/Dashboard";
import CRM from "./pages/CRM";
import Marketing from "./pages/Marketing";
import Login from "./pages/Login";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-studio-light">
          <Navigation />
          <main className="pb-20 md:pb-0">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/marketing" element={<Marketing />} />
            </Routes>
          </main>
          <BottomNavigation />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
