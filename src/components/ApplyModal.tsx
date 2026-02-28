import { useState } from "react";
import { X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import type { Job } from "@/data/jobs";

interface Props {
  job: Job;
  onClose: () => void;
}

const ApplyModal = ({ job, onClose }: Props) => {
  const { submitApplication } = useApp();
  const [form, setForm] = useState({ name: "", email: "", resumeLink: "", coverNote: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.resumeLink.trim()) e.resumeLink = "Resume link is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    submitApplication({
      ...form,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
    });
    setSuccess(true);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-qh-black/50 p-4" onClick={onClose}>
      <div className="bg-card w-full max-w-lg p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-text-light hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-display font-semibold text-2xl text-foreground mb-1">Apply for {job.title}</h3>
        <p className="text-text-mid mb-6">{job.company} · {job.location}</p>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-qh-green/20 text-qh-green flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
            <p className="font-semibold text-lg text-foreground">Application submitted!</p>
            <p className="text-text-mid mt-2">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {([
              { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
              { key: "email", label: "Email", type: "email", placeholder: "john@example.com" },
              { key: "resumeLink", label: "Resume Link", type: "url", placeholder: "https://..." },
            ] as const).map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  className="w-full border border-border px-4 py-3 text-base font-body text-foreground placeholder:text-text-light outline-none focus:border-primary transition-colors"
                />
                {errors[f.key] && <p className="text-destructive text-sm mt-1">{errors[f.key]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Cover Note</label>
              <textarea
                placeholder="Why are you a great fit?"
                value={form.coverNote}
                onChange={(e) => setForm((p) => ({ ...p, coverNote: e.target.value }))}
                rows={3}
                className="w-full border border-border px-4 py-3 text-base font-body text-foreground placeholder:text-text-light outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary text-primary-foreground font-bold text-base py-3.5 border-none disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
