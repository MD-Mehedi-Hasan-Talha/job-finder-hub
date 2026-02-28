import ApplyModal from "@/components/ApplyModal";
import CategoriesSection from "@/components/CategoriesSection";
import CompanyLogos from "@/components/CompanyLogos";
import CTASection from "@/components/CTASection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LatestJobsSection from "@/components/LatestJobsSection";
import Navbar from "@/components/Navbar";
import { useApp } from "@/contexts/AppContext";
import type { Job } from "@/data/jobs";
import { useState } from "react";

const Index = () => {
  const { featured, latest, refreshData } = useApp();
  const [displayedJobs, setDisplayedJobs] = useState<Job[] | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  const handleSearch = async (title: string, location: string) => {
    // If location is the default or empty, we can pass it or not
    const loc = location === "Florence, Italy" ? "" : location; 
    await refreshData({ location: loc });
    
    // For title, since API doesn't mention it, we might still filter locally
    // but usually search implies backend. If I only have location, I'll use it.
    if (title) {
        setDisplayedJobs(featured.filter(j => j.title.toLowerCase().includes(title.toLowerCase())));
    } else {
        setDisplayedJobs(null);
    }
  };

  const handleCategoryClick = async (category: string) => {
    await refreshData({ category });
    setDisplayedJobs(null); // Reset local filtering
  };

  return (
    <div className="min-h-screen bg-card">
      <Navbar />
      <HeroSection onSearch={handleSearch} />
      <CompanyLogos />
      <CategoriesSection onCategoryClick={handleCategoryClick} />
      <CTASection />
      <FeaturedJobsSection jobs={displayedJobs ?? featured} onApply={setApplyJob} />
      <LatestJobsSection jobs={latest} />
      <Footer />
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
};

export default Index;
