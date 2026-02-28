import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { LogIn } from "lucide-react";

const AdminLogin = () => {
  const { loginAdmin, isAdmin } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdmin) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (loginAdmin(email, password)) {
      navigate("/admin");
    } else {
      setError("Invalid credentials. Use admin@quickhire.com / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border border-border p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <LogIn className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-display font-semibold text-2xl text-foreground">Admin Login</h1>
        </div>

        <p className="text-text-light text-sm mb-6">
          Demo credentials: <strong className="text-foreground">admin@quickhire.com</strong> / <strong className="text-foreground">admin123</strong>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@quickhire.com"
              className="w-full border border-border px-4 py-3 text-base font-body text-foreground placeholder:text-text-light outline-none focus:border-primary transition-colors bg-card"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-border px-4 py-3 text-base font-body text-foreground placeholder:text-text-light outline-none focus:border-primary transition-colors bg-card"
              required
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button type="submit" className="bg-primary text-primary-foreground font-bold text-base py-3.5 border-none mt-2">
            Sign In
          </button>
        </form>

        <a href="/" className="block text-center text-primary font-semibold text-sm mt-6 hover:underline">
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
