import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Users, Megaphone, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

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
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-studio-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-studio-mint">Studio Pro</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                          isActive(item.href)
                            ? "bg-studio-teal text-white"
                            : "text-studio-light hover:bg-studio-blue hover:text-white"
                        }`}>
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-studio-light">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-studio-light hover:bg-studio-blue hover:text-white">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-studio-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-studio-mint">Studio Pro</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-studio-light hover:text-white hover:bg-studio-blue focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t border-studio-blue">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${
                      isActive(item.href)
                        ? "bg-studio-teal text-white"
                        : "text-studio-light hover:bg-studio-blue hover:text-white"
                    }`}>
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-studio-light hover:bg-studio-blue hover:text-white flex items-center space-x-2">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
