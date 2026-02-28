import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { LogIn, Briefcase, Eye, EyeOff, ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  const { loginAdmin, isAdmin } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAdmin) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Simulate a bit of loading for premium feel
    setTimeout(() => {
      if (loginAdmin(email, password)) {
        navigate("/admin");
      } else {
        setError("Invalid credentials. Use the demo account.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md z-10">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
            <Briefcase className="w-6 h-6 text-primary-foreground -rotate-3" />
          </div>
          <span className="font-display font-bold text-3xl tracking-tight text-foreground">QuickHire</span>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl shadow-xl shadow-black/[0.03] p-8 md:p-10">
          <div className="mb-8">
            <h1 className="font-display font-bold text-2xl text-foreground mb-2">Admin Portal</h1>
            <p className="text-text-mid text-sm">Welcome back! Please enter your details to access the management dashboard.</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-lg mb-6 animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@quickhire.com"
                className="w-full border border-border bg-background px-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2 flex justify-between">
                <span>Password</span>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-primary hover:text-primary/80 normal-case tracking-normal"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-border bg-background px-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-base py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
            <div className="bg-primary/5 p-4 rounded-xl">
              <p className="text-xs text-primary/80 font-semibold mb-1 uppercase tracking-tight">Demo Access</p>
              <p className="text-sm text-foreground/80">
                <span className="font-bold">admin@quickhire.com</span> / <span className="font-bold">admin123</span>
              </p>
            </div>
            
            <button 
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 text-text-mid hover:text-foreground font-semibold text-sm transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Homepage
            </button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-text-light text-xs">
          &copy; 2026 QuickHire Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
