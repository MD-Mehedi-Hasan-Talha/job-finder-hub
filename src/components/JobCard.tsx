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
      <div
        className="w-12 h-12 rounded flex items-center justify-center font-bold text-lg"
        style={{ background: job.logoBg, color: job.logoColor }}
      >
        {job.logoLetter}
      </div>
      <span className="border border-primary text-primary text-sm font-semibold px-3 py-1 rounded-sm">{job.type}</span>
    </div>
    <div>
      <div className="font-semibold text-lg leading-[160%] text-foreground">{job.title}</div>
      <div className="text-base text-text-mid flex items-center gap-2">
        {job.company} <span className="w-1 h-1 bg-text-mid rounded-full opacity-30" /> {job.location}
      </div>
    </div>
    <p className="text-sm leading-[160%] text-text-light">{job.description}</p>
    <div className="flex gap-2 flex-wrap">
      {job.labels.map((l) => (
        <span key={l.name} className={`px-4 py-1 rounded-full text-sm font-semibold ${labelColors[l.color]}`}>{l.name}</span>
      ))}
    </div>
  </div>
);

export default JobCard;
