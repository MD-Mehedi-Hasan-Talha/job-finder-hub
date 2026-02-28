import { ArrowRight } from "lucide-react";
import LatestJobCard from "./LatestJobCard";
import type { LatestJob } from "@/data/jobs";

interface Props {
  jobs: LatestJob[];
}

const LatestJobsSection = ({ jobs }: Props) => (
  <section className="bg-bg-light px-4 md:px-10 xl:px-[124px] py-[72px] relative overflow-hidden">
    <div className="flex items-end justify-between mb-12 flex-wrap gap-3">
      <h2 className="font-display font-semibold text-[32px] md:text-[48px] leading-[110%] text-foreground">
        Latest <span className="text-primary">jobs open</span>
      </h2>
      <a href="#" className="flex items-center gap-2 font-semibold text-primary whitespace-nowrap">
        Show all jobs <ArrowRight className="w-6 h-6" />
      </a>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-8">
      {jobs.map((job) => (
        <LatestJobCard key={job.id} job={job} />
      ))}
    </div>
  </section>
);

export default LatestJobsSection;
