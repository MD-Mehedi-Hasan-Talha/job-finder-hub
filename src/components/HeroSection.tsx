import { useState } from "react";
import { Search, MapPin } from "lucide-react";

interface HeroSectionProps {
  onSearch: (title: string, location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("Florence, Italy");

  const handleSearch = () => {
    onSearch(jobTitle, location);
  };

  return (
    <section className="bg-bg-light px-4 md:px-10 xl:px-[124px] min-h-[500px] xl:min-h-[716px] relative overflow-hidden flex items-center">
      {/* Decorative pattern */}
      <div className="absolute right-0 top-0 w-[60%] h-full pointer-events-none overflow-hidden hidden md:block">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute border-4 border-secondary opacity-70 rotate-[64deg] rounded"
            style={{
              width: [192, 328, 320, 283][i - 1],
              height: [416, 796, 779, 716][i - 1],
              left: [60, 100, -40, -300][i - 1],
              top: [-10, -120, 120, 400][i - 1],
            }}
          />
        ))}
      </div>

      {/* Hero image placeholder */}
      <div className="absolute right-20 bottom-0 w-[480px] h-[640px] bg-gradient-to-br from-primary-light to-secondary z-[1] rounded hidden xl:flex items-center justify-center">
        <svg viewBox="0 0 100 140" fill="none" className="w-[120px] h-[120px] opacity-30">
          <circle cx="50" cy="35" r="25" fill="#c5cae9" />
          <path d="M10 140 Q10 90 50 90 Q90 90 90 140" fill="#9fa8da" />
        </svg>
      </div>

      <div className="relative z-[2] max-w-[580px] py-20 xl:py-40">
        <h1 className="font-display font-semibold text-[48px] xl:text-[72px] leading-[110%] text-foreground mb-6">
          Discover<br />more than<br />
          <span className="text-primary">5000+ Jobs</span>
        </h1>
        <div className="w-[220px] h-1 bg-qh-blue mb-6" />
        <p className="text-lg xl:text-xl font-normal leading-[160%] text-text-mid opacity-70 max-w-[521px] mb-8">
          Great platform for the job seeker that searching for new career heights and passionate about startups.
        </p>

        {/* Search Box */}
        <div className="bg-card shadow-[0_20px_60px_rgba(192,192,192,0.15)] flex flex-col md:flex-row items-stretch p-4 gap-0 mb-4">
          <div className="flex items-center gap-4 px-4 flex-1 border-b md:border-b-0 md:border-r border-border py-3 md:py-0">
            <Search className="w-6 h-6 text-foreground shrink-0" />
            <input
              type="text"
              placeholder="Job title or keyword"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="border-none outline-none font-body text-base text-foreground bg-transparent w-full placeholder:text-text-light placeholder:opacity-50"
            />
          </div>
          <div className="flex items-center gap-4 px-4 flex-1 py-3 md:py-0">
            <MapPin className="w-6 h-6 text-foreground shrink-0" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-none outline-none font-body text-base text-foreground bg-transparent w-full"
            >
              <option>Florence, Italy</option>
              <option>New York, USA</option>
              <option>Berlin, Germany</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="bg-primary text-primary-foreground font-bold text-lg border-none px-7 py-3.5 whitespace-nowrap mt-2 md:mt-0"
          >
            Search my job
          </button>
        </div>

        <p className="text-base text-qh-black opacity-70">
          <strong className="font-semibold">Popular:</strong>&nbsp; UI Designer,&nbsp; UX Researcher,&nbsp; Android,&nbsp; Admin
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
