import { Link, useLocation } from "react-router-dom";
import { Home, Users, Megaphone } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const BottomNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "CRM", href: "/crm", icon: Users },
    { name: "Marketing", href: "/marketing", icon: Megaphone },
  ];

  const isActive = (path) => {
    // Handle exact path matching
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname === path) return true;
    return false;
  };

  if (!user) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-studio-dark shadow-lg border-t border-studio-blue">
      <div className="grid grid-cols-3 h-16">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-green-400 bg-green-900/20"
                  : "text-studio-light hover:text-green-300 hover:bg-green-900/10"
              }`}>
              <Icon size={20} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
