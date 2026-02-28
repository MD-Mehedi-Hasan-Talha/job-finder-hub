import type { Job, LatestJob } from "@/data/jobs";
import { api } from "@/lib/api";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

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
  addJob: (job: Omit<Job, "id">) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  submitApplication: (app: Omit<Application, "id" | "submittedAt">) => Promise<void>;
  loginAdmin: (username: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  refreshData: (filters?: { category?: string; location?: string }) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [featured, setFeatured] = useState<Job[]>([]);
  const [latest, setLatest] = useState<LatestJob[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("adminToken"));

  const refreshData = useCallback(async (filters?: { category?: string; location?: string }) => {
    try {
      let endpoint = "/api/jobs";
      const params = new URLSearchParams();
      if (filters?.category) params.append("category", filters.category);
      if (filters?.location) params.append("location", filters.location);
      if (params.toString()) endpoint += `?${params.toString()}`;

      const jobs = await api.get(endpoint);
      const normalizedJobs = jobs.map((j: any) => ({
        ...j,
        id: j.id || j._id // Handle both id and _id (common in MongoDB)
      }));
      setFeatured(normalizedJobs);
      setLatest(normalizedJobs.slice(0, 8));
      
      if (localStorage.getItem("adminToken")) {
        // Fetch all applications
        const allApps: Application[] = [];
        for (const job of normalizedJobs) {
          try {
            const apps = await api.get(`/api/applications/${job.id}`);
            allApps.push(...apps.map((a: any) => ({ ...a, id: a.id || a._id })));
          } catch (e) {
            console.error(`Failed to fetch apps for job ${job.id}`, e);
          }
        }
        setApplications(allApps);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData, isAdmin]);

  const addJob = useCallback(async (job: Omit<Job, "id">) => {
    await api.post("/api/jobs", job);
    await refreshData();
  }, [refreshData]);

  const updateJob = useCallback(async (id: string, updates: Partial<Job>) => {
    // Switching to PUT as it's the standard for updates
    await api.put(`/api/jobs/${id}`, updates); 
    await refreshData();
  }, [refreshData]);

  const deleteJob = useCallback(async (id: string) => {
    await api.delete(`/api/jobs/${id}`);
    await refreshData();
  }, [refreshData]);

  const submitApplication = useCallback(async (app: Omit<Application, "id" | "submittedAt">) => {
    await api.post("/api/applications", app);
    await refreshData();
  }, [refreshData]);

  const loginAdmin = useCallback(async (username: string, password: string) => {
    try {
      const data = await api.post("/api/auth/login", { username, password });
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUsername", data.username);
      setIsAdmin(true);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  }, []);

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    setIsAdmin(false);
  }, []);

  return (
    <AppContext.Provider
      value={{ featured, latest, applications, isAdmin, addJob, updateJob, deleteJob, submitApplication, loginAdmin, logoutAdmin, refreshData }}
    >
      {children}
    </AppContext.Provider>
  );
};
