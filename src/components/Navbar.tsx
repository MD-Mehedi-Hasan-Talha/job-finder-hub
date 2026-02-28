import { useState } from "react";
import { Search, X, Menu } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-card flex flex-col p-6 gap-0 lg:hidden">
          <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Search className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-logo font-bold text-2xl text-foreground">QuickHire</span>
            </a>
            <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center">
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <ul className="flex flex-col">
            {["Find Jobs", "Browse Companies", "Categories", "About"].map((item) => (
              <li key={item}>
                <a href="#" onClick={() => setMobileOpen(false)} className="block py-4 font-medium text-lg text-foreground border-b border-border">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 mt-8">
            <button className="w-full py-3.5 font-bold text-primary border-2 border-primary bg-transparent">Login</button>
            <button className="w-full py-3.5 font-bold text-primary-foreground bg-primary border-none">Sign Up</button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-10 xl:px-[124px] h-[78px] bg-bg-light shadow-[inset_0_-1px_0_hsl(var(--border))] relative z-40">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
            <Search className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-logo font-bold text-2xl text-foreground">QuickHire</span>
        </a>

        <ul className="hidden lg:flex gap-12 list-none">
          <li><a href="#" className="font-medium text-text-mid hover:text-primary transition-colors">Find Jobs</a></li>
          <li><a href="#" className="font-medium text-text-mid hover:text-primary transition-colors">Browse Companies</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="hidden lg:block font-bold text-primary bg-transparent border-none px-6 py-3">Login</button>
          <div className="hidden lg:block w-px h-12 bg-border" />
          <button className="hidden lg:block font-bold text-primary-foreground bg-primary border-none px-6 py-3">Sign Up</button>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col items-center justify-center gap-[5px] w-9 h-9 border border-border rounded-full bg-card"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
