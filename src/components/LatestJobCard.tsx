import type { LatestJob } from "@/data/jobs";

interface Props {
  job: LatestJob;
}

const LatestJobCard = ({ job }: Props) => (
  <div className="bg-card p-5 md:px-10 md:py-6 flex items-start gap-4 md:gap-6 cursor-pointer transition-all hover:shadow-[0_4px_24px_rgba(70,64,222,0.08)]">
    {job.logoURL ? (
      <img src={job.logoURL} alt={job.company} className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded object-cover" />
    ) : (
      <div
        className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded flex items-center justify-center font-bold text-lg md:text-xl"
        style={{ background: job.logoBg || "hsl(var(--primary)/10)", color: job.logoColor || "hsl(var(--primary))" }}
      >
        {job.logoLetter || job.company[0]}
      </div>
    )}
    <div className="flex-1">
      <div className="font-semibold text-lg md:text-xl leading-[120%] text-foreground mb-2">{job.title}</div>
      <div className="flex items-center gap-2 text-sm text-text-mid mb-2">
        {job.company} <span className="w-1 h-1 bg-text-mid rounded-full opacity-30" /> {job.location}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="border border-primary text-primary rounded-full px-2.5 py-1.5 text-xs font-semibold bg-primary/5 uppercase">{job.type}</span>
        <div className="w-px h-[34px] bg-border shrink-0" />
        <span className="border border-qh-blue text-qh-blue rounded-full px-2.5 py-1.5 text-xs font-semibold bg-qh-blue/5 uppercase">{job.category}</span>
        <span className="text-sm font-bold text-text-mid ml-auto">{job.salary}</span>
      </div>
    </div>
  </div>
);

export default LatestJobCard;
