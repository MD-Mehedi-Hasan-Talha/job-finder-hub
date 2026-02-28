import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanyLogos from "@/components/CompanyLogos";
import CategoriesSection from "@/components/CategoriesSection";
import CTASection from "@/components/CTASection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import LatestJobsSection from "@/components/LatestJobsSection";
import Footer from "@/components/Footer";
import ApplyModal from "@/components/ApplyModal";
import { useApp } from "@/contexts/AppContext";
import type { Job } from "@/data/jobs";
import { featuredJobs as defaultFeatured } from "@/data/jobs";

const Index = () => {
  const { featured, latest } = useApp();
  const [displayedJobs, setDisplayedJobs] = useState<Job[] | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  const handleSearch = (title: string, location: string) => {
    const filtered = featured.filter(
      (j) =>
        j.title.toLowerCase().includes(title.toLowerCase()) &&
        (location === "" || j.location.toLowerCase().includes(location.toLowerCase()))
    );
    setDisplayedJobs(filtered.length > 0 ? filtered : null);
  };

  return (
    <div className="min-h-screen bg-card">
      <Navbar />
      <HeroSection onSearch={handleSearch} />
      <CompanyLogos />
      <CategoriesSection />
      <CTASection />
      <FeaturedJobsSection jobs={displayedJobs ?? featured} onApply={setApplyJob} />
      <LatestJobsSection jobs={latest} />
      <Footer />
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
};

export default Index;
