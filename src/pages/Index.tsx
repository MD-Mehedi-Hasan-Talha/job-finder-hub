import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CompanyLogos from "@/components/CompanyLogos";
import CategoriesSection from "@/components/CategoriesSection";
import CTASection from "@/components/CTASection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import LatestJobsSection from "@/components/LatestJobsSection";
import Footer from "@/components/Footer";
import ApplyModal from "@/components/ApplyModal";
import { featuredJobs as defaultFeatured, latestJobs as defaultLatest } from "@/data/jobs";
import type { Job } from "@/data/jobs";

const Index = () => {
  const [featured, setFeatured] = useState(defaultFeatured);
  const [latest, setLatest] = useState(defaultLatest);
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  // Mock API fetch
  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((data) => {
        if (data?.featured) setFeatured(data.featured);
        if (data?.latest) setLatest(data.latest);
      })
      .catch(() => {
        // Use default data
      });
  }, []);

  const handleSearch = (title: string, location: string) => {
    const filtered = defaultFeatured.filter(
      (j) =>
        j.title.toLowerCase().includes(title.toLowerCase()) &&
        (location === "" || j.location.toLowerCase().includes(location.toLowerCase()))
    );
    setFeatured(filtered.length > 0 ? filtered : defaultFeatured);
  };

  return (
    <div className="min-h-screen bg-card">
      <Navbar />
      <HeroSection onSearch={handleSearch} />
      <CompanyLogos />
      <CategoriesSection />
      <CTASection />
      <FeaturedJobsSection jobs={featured} onApply={setApplyJob} />
      <LatestJobsSection jobs={latest} />
      <Footer />
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
};

export default Index;
