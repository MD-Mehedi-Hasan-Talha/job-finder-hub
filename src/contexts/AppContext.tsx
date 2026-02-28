import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { featuredJobs as defaultFeatured, latestJobs as defaultLatest } from "@/data/jobs";
import type { Job, LatestJob } from "@/data/jobs";

export interface Application {
  id: number;
  jobId: number;
  jobTitle: string;
  company: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  submittedAt: string;
}

interface AppContextType {
  featured: Job[];
  latest: LatestJob[];
  applications: Application[];
  isAdmin: boolean;
  addJob: (job: Omit<Job, "id">) => void;
  updateJob: (id: number, job: Partial<Job>) => void;
  deleteJob: (id: number) => void;
  submitApplication: (app: Omit<Application, "id" | "submittedAt">) => void;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

// Demo credentials — frontend-only, not secure
const DEMO_EMAIL = "admin@quickhire.com";
const DEMO_PASS = "admin123";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [featured, setFeatured] = useState<Job[]>(defaultFeatured);
  const [latest] = useState<LatestJob[]>(defaultLatest);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const addJob = useCallback((job: Omit<Job, "id">) => {
    setFeatured((prev) => [...prev, { ...job, id: Date.now() }]);
  }, []);

  const updateJob = useCallback((id: number, updates: Partial<Job>) => {
    setFeatured((prev) => prev.map((j) => (j.id === id ? { ...j, ...updates } : j)));
  }, []);

  const deleteJob = useCallback((id: number) => {
    setFeatured((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const submitApplication = useCallback((app: Omit<Application, "id" | "submittedAt">) => {
    setApplications((prev) => [
      ...prev,
      { ...app, id: Date.now(), submittedAt: new Date().toISOString() },
    ]);
  }, []);

  const loginAdmin = useCallback((email: string, password: string) => {
    if (email === DEMO_EMAIL && password === DEMO_PASS) {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => setIsAdmin(false), []);

  return (
    <AppContext.Provider
      value={{ featured, latest, applications, isAdmin, addJob, updateJob, deleteJob, submitApplication, loginAdmin, logoutAdmin }}
    >
      {children}
    </AppContext.Provider>
  );
};
