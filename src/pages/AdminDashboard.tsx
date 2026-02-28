import AdminLayout from "@/components/admin/AdminLayout";
import { useApp } from "@/contexts/AppContext";
import type { Job } from "@/data/jobs";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  Edit2,
  ExternalLink,
  FileText,
  MapPin,
  MoreVertical,
  Plus,
  Trash2,
  TrendingUp,
  Users,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const emptyJob: Omit<Job, "id"> = {
  title: "", company: "", location: "", category: "Design", type: "Full-Time", description: "",
  salary: "", logoURL: "",
  logoLetter: "", logoBg: "hsl(var(--bg-light))", logoColor: "hsl(var(--primary))",
};

const AdminDashboard = () => {
  const { featured, applications, isAdmin, addJob, updateJob, deleteJob } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  const [editing, setEditing] = useState<Job | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyJob);

  if (!isAdmin) {
    navigate("/admin/login");
    return null;
  }

  // Stats calculation
  const stats = useMemo(() => {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const newApps = applications.filter(app => new Date(app.submittedAt) > lastWeek).length;
    
    return [
      { label: "Total Jobs", value: featured.length, icon: Briefcase, color: "bg-primary/10 text-primary", trend: "+2 this month" },
      { label: "Total Applications", value: applications.length, icon: FileText, color: "bg-qh-blue/10 text-qh-blue", trend: "+12% vs last month" },
      { label: "New Applications", value: newApps, icon: Users, color: "bg-qh-green/10 text-qh-green", subtitle: "Last 7 days" },
      { label: "Success Rate", value: "84%", icon: TrendingUp, color: "bg-qh-yellow/10 text-qh-yellow", trend: "+5% scale" },
    ];
  }, [featured.length, applications]);

  const openCreate = () => {
    setForm(emptyJob);
    setEditing(null);
    setCreating(true);
  };

  const openEdit = (job: Job) => {
    setForm(job);
    setEditing(job);
    setCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim()) return;
    const jobData = {
      title: form.title,
      company: form.company,
      location: form.location,
      category: form.category,
      type: form.type,
      description: form.description,
      salary: form.salary,
      logoURL: form.logoURL,
    };
    
    try {
      if (editing) {
        await updateJob(editing.id, jobData);
      } else {
        await addJob(jobData);
      }
      setCreating(false);
      setEditing(null);
    } catch (error: any) {
      console.error("Failed to save job", error);
      alert(`Failed to save job: ${error.message}. Please check your connection or payload.`);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.trend && (
                <span className="text-[10px] font-bold text-qh-green bg-qh-green/10 px-2 py-1 rounded-full">{stat.trend}</span>
              )}
            </div>
            <div>
              <p className="text-text-light text-sm font-semibold mb-1">{stat.label}</p>
              <h3 className="text-3xl font-display font-bold text-foreground">{stat.value}</h3>
              {stat.subtitle && <p className="text-[11px] text-text-light mt-1">{stat.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Jobs */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-foreground">Recently Posted Jobs</h3>
            <button onClick={() => navigate("/admin?tab=jobs")} className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full">
              <tbody className="divide-y divide-border/30">
                {featured.slice(0, 5).map((job) => (
                  <tr key={job.id} className="hover:bg-bg-light/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-qh-black flex items-center justify-center text-white font-bold text-sm">
                          {job.logoLetter}
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm leading-tight">{job.title}</p>
                          <p className="text-xs text-text-light mt-0.5">{job.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-text-mid text-xs font-semibold">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </div>
                        <div className="text-[10px] text-primary font-bold uppercase">{job.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="inline-block px-2 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase tracking-wider border border-primary/10">
                          {job.type}
                        </span>
                        <span className="text-[10px] font-bold text-text-mid">{job.salary}</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {featured.length === 0 && (
                  <tr><td className="px-6 py-10 text-center text-text-light text-sm italic">No jobs posted yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-foreground">Recent Apps</h3>
            <button onClick={() => navigate("/admin?tab=applications")} className="text-primary text-sm font-bold hover:underline">
              View all
            </button>
          </div>
          <div className="p-4 space-y-4">
            {applications.slice(0, 4).map((app) => (
              <div key={app.id} className="flex gap-3 p-3 rounded-xl hover:bg-bg-light transition-colors group">
                <div className="w-10 h-10 rounded-full bg-qh-blue/10 flex items-center justify-center text-qh-blue font-bold text-xs shrink-0 uppercase">
                  {app.name.substring(0, 2)}
                </div>
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-foreground text-sm truncate">{app.name}</p>
                  <p className="text-[11px] text-text-light truncate mt-0.5">applied for <span className="text-primary font-semibold">{app.jobTitle}</span></p>
                </div>
                <div className="ml-auto flex items-center">
                   <p className="text-[10px] text-text-light font-medium">{new Date(app.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <div className="py-10 text-center text-text-light text-sm italic">No applications yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Manage Jobs</h2>
          <p className="text-text-mid text-sm mt-1">Add, edit, or remove job listings from the platform.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
          <Plus className="w-4 h-4" /> Add New Job
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-light/40">
                <th className="px-6 py-4 text-[11px] font-bold text-text-mid uppercase tracking-wider">Job Information</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-mid uppercase tracking-wider hidden md:table-cell">Details</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-mid uppercase tracking-wider hidden lg:table-cell">Posting Date</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold text-text-mid uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {featured.map((job) => (
                <tr key={job.id} className="hover:bg-bg-light/20 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-qh-black flex items-center justify-center text-white font-bold text-base shadow-sm">
                        {job.logoLetter}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm uppercase">{job.title}</p>
                        <p className="text-xs text-text-light font-medium mt-0.5">{job.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-text-mid text-xs font-semibold">
                        <MapPin className="w-3 h-3 text-text-light" /> {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block px-2 py-0.5 bg-qh-blue/5 text-qh-blue text-[10px] font-bold rounded uppercase border border-qh-blue/10">
                          {job.category}
                        </span>
                        <span className="text-[10px] font-bold text-text-mid ml-2">{job.salary}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-text-light text-xs">
                      <Calendar className="w-3.5 h-3.5" /> 24 July, 2024
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(job)} className="p-2 text-text-mid hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={async () => { 
                        if(window.confirm("Are you sure you want to delete this job?")) {
                          try {
                            await deleteJob(job.id);
                          } catch (error: any) {
                            console.error("Failed to delete job", error);
                            alert(`Failed to delete job: ${error.message}`);
                          }
                        }
                      }} className="p-2 text-text-mid hover:text-destructive hover:bg-destructive/5 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-text-mid hover:text-foreground rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {featured.length === 0 && (
                <tr><td colSpan={4} className="text-center py-20 text-text-light italic">No job listings found. Start by adding one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="font-display font-bold text-2xl text-foreground">Applications</h2>
        <p className="text-text-mid text-sm mt-1">Review and manage candidate applications for your job posts.</p>
      </div>

      <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-light/40">
                <th className="px-6 py-4 text-[11px] font-bold text-text-mid uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-mid uppercase tracking-wider">Job Applied</th>
                <th className="px-6 py-4 text-[11px] font-bold text-text-mid uppercase tracking-wider hidden lg:table-cell">Resume/Link</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold text-text-mid uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-bg-light/20 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-qh-blue/5 flex items-center justify-center text-qh-blue font-bold text-xs uppercase border border-qh-blue/10">
                        {app.name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">{app.name}</p>
                        <p className="text-xs text-text-light mt-0.5">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-bold text-foreground text-[13px] leading-tight">{app.jobTitle}</p>
                      <p className="text-[11px] text-text-light font-medium mt-1 uppercase tracking-tight">{app.company}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <a 
                      href={app.resumeLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-primary hover:underline text-xs font-bold bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Resume
                    </a>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="inline-block px-2.5 py-1 bg-qh-yellow/10 text-qh-yellow text-[10px] font-bold rounded-full uppercase tracking-wider border border-qh-yellow/10">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr><td colSpan={4} className="text-center py-20 text-text-light italic">No applications received yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {tab === "overview" && renderOverview()}
      {tab === "jobs" && renderJobs()}
      {tab === "applications" && renderApplications()}

      {/* Create/Edit Modal */}
      {creating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-qh-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setCreating(false)}>
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-0 relative max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground">
                  {editing ? "Edit Job Listing" : "Create New Job"}
                </h3>
                <p className="text-text-mid text-sm mt-1">Fill in the details for the job position.</p>
              </div>
              <button onClick={() => setCreating(false)} className="p-2 text-text-light hover:text-foreground hover:bg-bg-light rounded-xl transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-5 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Job Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Senior Brand Designer"
                    className="w-full border border-border bg-[#FBFBFE] px-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Company Name</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                    placeholder="e.g. Dropbox Inc."
                    className="w-full border border-border bg-[#FBFBFE] px-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                    <input
                      value={form.location}
                      onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                      placeholder="e.g. San Francisco, US"
                      className="w-full border border-border bg-[#FBFBFE] pl-11 pr-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Job Type</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                    <input
                      value={form.type}
                      onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                      placeholder="e.g. Full Time"
                      className="w-full border border-border bg-[#FBFBFE] pl-11 pr-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full border border-border bg-[#FBFBFE] px-4 py-3 rounded-xl text-foreground outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body text-sm"
                  >
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Business">Business</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Salary Range</label>
                  <input
                    value={form.salary}
                    onChange={(e) => setForm((p) => ({ ...p, salary: e.target.value }))}
                    placeholder="e.g. $140k - $180k"
                    className="w-full border border-border bg-[#FBFBFE] px-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Logo URL</label>
                <div className="flex items-center gap-4">
                  {form.logoURL ? (
                    <img src={form.logoURL} alt="Logo" className="w-12 h-12 rounded-xl object-cover border border-border" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-qh-black flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {form.logoLetter || (form.company[0]?.toUpperCase() || "?")}
                    </div>
                  )}
                  <input
                    value={form.logoURL}
                    onChange={(e) => setForm((p) => ({ ...p, logoURL: e.target.value }))}
                    placeholder="https://example.com/logo.png"
                    className="flex-1 border border-border bg-[#FBFBFE] px-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-mid mb-2">Detailed Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  rows={4}
                  className="w-full border border-border bg-[#FBFBFE] px-4 py-3 rounded-xl text-foreground placeholder:text-text-light outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-body text-sm resize-none"
                />
              </div>
            </form>

            <div className="p-6 border-t border-border/50 bg-[#FBFBFE] flex items-center justify-end gap-3 rounded-b-2xl">
              <button 
                type="button" 
                onClick={() => setCreating(false)}
                className="px-6 py-3 text-text-mid hover:text-foreground font-bold text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSave}
                className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm px-8 py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                {editing ? "Update Listing" : "Publish Job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
