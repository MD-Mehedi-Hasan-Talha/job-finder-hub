import type { Job } from "@/data/jobs";

const labelColors: Record<string, string> = {
  marketing: "bg-qh-yellow/10 text-qh-yellow",
  design: "bg-qh-green/10 text-qh-green",
  business: "bg-primary/10 text-primary",
  technology: "bg-qh-blue/10 text-qh-blue",
};

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

const JobCard = ({ job, onApply }: JobCardProps) => (
  <div
    onClick={() => onApply(job)}
    className="border border-border p-6 cursor-pointer transition-all hover:shadow-[0_8px_32px_rgba(70,64,222,0.1)] flex flex-col gap-4 min-w-[260px] max-w-[280px] xl:max-w-none snap-start shrink-0 xl:shrink"
  >
    <div className="flex justify-between items-start">
      {job.logoURL ? (
        <img src={job.logoURL} alt={job.company} className="w-12 h-12 rounded object-cover" />
      ) : (
        <div
          className="w-12 h-12 rounded flex items-center justify-center font-bold text-lg"
          style={{ background: job.logoBg || "hsl(var(--primary)/10)", color: job.logoColor || "hsl(var(--primary))" }}
        >
          {job.logoLetter || job.company[0]}
        </div>
      )}
      <div className="flex flex-col items-end gap-1">
        <span className="border border-primary text-primary text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">{job.type}</span>
        <span className="text-[10px] font-bold text-text-mid">{job.salary}</span>
      </div>
    </div>
    <div className="flex-1">
      <div className="font-semibold text-lg leading-[160%] text-foreground">{job.title}</div>
      <div className="text-sm text-text-mid flex items-center gap-2">
        {job.company} <span className="w-1 h-1 bg-text-mid rounded-full opacity-30" /> {job.location}
      </div>
      <p className="text-sm leading-[160%] text-text-light mt-2 line-clamp-2">{job.description}</p>
    </div>
    <div className="flex gap-2 flex-wrap">
      <span className={`px-4 py-1 rounded-full text-sm font-semibold bg-primary/5 text-primary`}>
        {job.category}
      </span>
      {job.labels?.map((l) => (
        <span key={l.name} className={`px-4 py-1 rounded-full text-sm font-semibold ${labelColors[l.color]}`}>{l.name}</span>
      ))}
    </div>
  </div>
);

export default JobCard;
