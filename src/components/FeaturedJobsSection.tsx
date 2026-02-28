import { ArrowRight } from "lucide-react";
import JobCard from "./JobCard";
import type { Job } from "@/data/jobs";

interface Props {
  jobs: Job[];
  onApply: (job: Job) => void;
}

const FeaturedJobsSection = ({ jobs, onApply }: Props) => (
  <section className="px-4 md:px-10 xl:px-[124px] pb-[72px] bg-card">
    <div className="flex items-end justify-between mb-12 flex-wrap gap-3">
      <h2 className="font-display font-semibold text-[32px] md:text-[48px] leading-[110%] text-foreground">
        Featured <span className="text-primary">jobs</span>
      </h2>
      <a href="#" className="flex items-center gap-2 font-semibold text-primary whitespace-nowrap">
        Show all jobs <ArrowRight className="w-6 h-6" />
      </a>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-8 overflow-x-auto xl:overflow-visible flex xl:grid flex-row snap-x snap-mandatory pb-2 xl:pb-0">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onApply={onApply} />
      ))}
    </div>
  </section>
);

export default FeaturedJobsSection;
