import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { LogOut, Plus, Trash2, Edit2, X, Briefcase, FileText } from "lucide-react";
import type { Job } from "@/data/jobs";

type Tab = "jobs" | "applications";

const emptyJob: Omit<Job, "id"> = {
  title: "", company: "", location: "", type: "Full Time", description: "",
  labels: [], logoLetter: "", logoBg: "hsl(var(--bg-light))", logoColor: "hsl(var(--primary))",
};

const AdminDashboard = () => {
  const { featured, applications, isAdmin, logoutAdmin, addJob, updateJob, deleteJob } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("jobs");
  const [editing, setEditing] = useState<Job | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyJob);

  if (!isAdmin) {
    navigate("/admin/login");
    return null;
  }

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim()) return;
    const jobData = { ...form, logoLetter: form.logoLetter || form.company[0]?.toUpperCase() || "?" };
    if (editing) {
      updateJob(editing.id, jobData);
    } else {
      addJob(jobData);
    }
    setCreating(false);
    setEditing(null);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-10 xl:px-[124px] h-[78px] bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">QuickHire Admin</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-text-mid hover:text-destructive font-semibold text-sm transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="px-4 md:px-10 xl:px-[124px] py-8">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-border mb-8">
          {([["jobs", "Jobs", Briefcase], ["applications", "Applications", FileText]] as const).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key as Tab)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-colors -mb-px ${
                tab === key ? "border-primary text-primary" : "border-transparent text-text-mid hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
              <span className="ml-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                {key === "jobs" ? featured.length : applications.length}
              </span>
            </button>
          ))}
        </div>

        {/* Jobs Tab */}
        {tab === "jobs" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-2xl text-foreground">Manage Jobs</h2>
              <button onClick={openCreate} className="flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 border-none">
                <Plus className="w-4 h-4" /> Add Job
              </button>
            </div>

            <div className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-background">
                      <th className="text-left px-4 py-3 font-semibold text-text-mid">Title</th>
                      <th className="text-left px-4 py-3 font-semibold text-text-mid">Company</th>
                      <th className="text-left px-4 py-3 font-semibold text-text-mid hidden md:table-cell">Location</th>
                      <th className="text-left px-4 py-3 font-semibold text-text-mid hidden lg:table-cell">Type</th>
                      <th className="text-right px-4 py-3 font-semibold text-text-mid">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featured.map((job) => (
                      <tr key={job.id} className="border-t border-border hover:bg-background/60 transition-colors">
                        <td className="px-4 py-3 font-semibold text-foreground">{job.title}</td>
                        <td className="px-4 py-3 text-text-mid">{job.company}</td>
                        <td className="px-4 py-3 text-text-mid hidden md:table-cell">{job.location}</td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="border border-primary text-primary text-xs font-semibold px-2 py-0.5">{job.type}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(job)} className="p-1.5 text-text-mid hover:text-primary transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteJob(job.id)} className="p-1.5 text-text-mid hover:text-destructive transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {featured.length === 0 && (
                      <tr><td colSpan={5} className="text-center py-12 text-text-light">No jobs yet. Click "Add Job" to create one.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Applications Tab */}
        {tab === "applications" && (
          <>
            <h2 className="font-display font-semibold text-2xl text-foreground mb-6">Applications</h2>
            {applications.length === 0 ? (
              <div className="border border-border p-12 text-center text-text-light">
                No applications yet. Users can apply from the homepage.
              </div>
            ) : (
              <div className="border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-background">
                        <th className="text-left px-4 py-3 font-semibold text-text-mid">Applicant</th>
                        <th className="text-left px-4 py-3 font-semibold text-text-mid">Email</th>
                        <th className="text-left px-4 py-3 font-semibold text-text-mid hidden md:table-cell">Job</th>
                        <th className="text-left px-4 py-3 font-semibold text-text-mid hidden lg:table-cell">Company</th>
                        <th className="text-left px-4 py-3 font-semibold text-text-mid hidden lg:table-cell">Resume</th>
                        <th className="text-left px-4 py-3 font-semibold text-text-mid hidden xl:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-t border-border hover:bg-background/60 transition-colors">
                          <td className="px-4 py-3 font-semibold text-foreground">{app.name}</td>
                          <td className="px-4 py-3 text-text-mid">{app.email}</td>
                          <td className="px-4 py-3 text-text-mid hidden md:table-cell">{app.jobTitle}</td>
                          <td className="px-4 py-3 text-text-mid hidden lg:table-cell">{app.company}</td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-primary hover:underline text-xs font-semibold">View</a>
                          </td>
                          <td className="px-4 py-3 text-text-light text-xs hidden xl:table-cell">
                            {new Date(app.submittedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create/Edit Modal */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-qh-black/50 p-4" onClick={() => setCreating(false)}>
          <div className="bg-card w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setCreating(false)} className="absolute top-4 right-4 text-text-light hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
              {editing ? "Edit Job" : "Add New Job"}
            </h3>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {([
                { key: "title", label: "Job Title", placeholder: "e.g. Brand Designer" },
                { key: "company", label: "Company", placeholder: "e.g. Dropbox" },
                { key: "location", label: "Location", placeholder: "e.g. San Francisco, US" },
                { key: "type", label: "Type", placeholder: "e.g. Full Time" },
                { key: "logoLetter", label: "Logo Letter(s)", placeholder: "e.g. D" },
              ] as const).map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">{f.label}</label>
                  <input
                    value={(form as any)[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full border border-border px-4 py-3 text-base font-body text-foreground placeholder:text-text-light outline-none focus:border-primary transition-colors bg-card"
                    required={f.key === "title" || f.key === "company"}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Job description..."
                  rows={3}
                  className="w-full border border-border px-4 py-3 text-base font-body text-foreground placeholder:text-text-light outline-none focus:border-primary transition-colors resize-none bg-card"
                />
              </div>
              <button type="submit" className="bg-primary text-primary-foreground font-bold text-base py-3.5 border-none mt-2">
                {editing ? "Save Changes" : "Create Job"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
