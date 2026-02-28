import { useApp } from "@/contexts/AppContext";
import {
    Bell,
    Briefcase,
    FileText,
    LayoutDashboard,
    LogOut,
    Menu,
    Search,
    Settings,
    User
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logoutAdmin, featured, applications } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin", count: null },
    { label: "Jobs", icon: Briefcase, path: "/admin?tab=jobs", count: featured.length },
    { label: "Applications", icon: FileText, path: "/admin?tab=applications", count: applications.length },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex font-body">
      {/* Sidebar Desktop */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-qh-black text-white transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
              <Briefcase className="w-5 h-5 text-primary-foreground -rotate-3" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">QuickHire</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group
                  ${location.pathname + location.search === item.path || (location.pathname === item.path && !location.search && item.label === "Dashboard")
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-white/60 hover:text-white hover:bg-white/5"}
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 transition-colors ${location.pathname + location.search === item.path ? "text-white" : "group-hover:text-white"}`} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${location.pathname + location.search === item.path ? "bg-white/20 text-white" : "bg-white/10 text-white/40"}`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-colors group">
              <Settings className="w-5 h-5" />
              <span className="font-semibold text-sm">Settings</span>
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-destructive transition-colors group"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-semibold text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-[80px] bg-white border-b border-border/50 flex items-center justify-between px-4 md:px-10 z-40">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-text-mid hover:text-foreground hover:bg-bg-light rounded-lg mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center bg-[#F1F4F9] px-4 py-2.5 rounded-xl w-full max-w-md border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-text-light" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none ml-3 text-sm w-full text-foreground placeholder:text-text-light font-body"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            <button className="p-2.5 text-text-mid hover:text-foreground hover:bg-bg-light rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-border/50 mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-foreground leading-none">Admin User</p>
                <p className="text-[11px] text-text-light font-semibold uppercase tracking-wider mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/10">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
