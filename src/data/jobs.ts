export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  labels: { name: string; color: "marketing" | "design" | "business" | "technology" }[];
  logoLetter: string;
  logoBg: string;
  logoColor: string;
}

export const featuredJobs: Job[] = [
  { id: 1, title: "Email Marketing", company: "Revolut", location: "Madrid, Spain", type: "Full Time", description: "Revolut is looking for Email Marketing to help team manage...", labels: [{ name: "Marketing", color: "marketing" }, { name: "Design", color: "design" }], logoLetter: "R", logoBg: "hsl(var(--bg-light))", logoColor: "hsl(var(--primary))" },
  { id: 2, title: "Brand Designer", company: "Dropbox", location: "San Francisco, US", type: "Full Time", description: "Dropbox is looking for Brand Designer to help the team...", labels: [{ name: "Design", color: "design" }, { name: "Business", color: "business" }], logoLetter: "D", logoBg: "#e3f0ff", logoColor: "#0062FF" },
  { id: 3, title: "Email Marketing", company: "Pitch", location: "Berlin, Germany", type: "Full Time", description: "Pitch is looking for Customer Manager to join marketing t...", labels: [{ name: "Marketing", color: "marketing" }], logoLetter: "P", logoBg: "#fff0e8", logoColor: "#FF6550" },
  { id: 4, title: "Visual Designer", company: "Blinklist", location: "Granada, Spain", type: "Full Time", description: "Blinklist is looking for Visual Designer to help team desi...", labels: [{ name: "Design", color: "design" }], logoLetter: "B", logoBg: "#e8f7f3", logoColor: "#56CDAD" },
  { id: 5, title: "Product Designer", company: "ClassPass", location: "Manchester, UK", type: "Full Time", description: "ClassPass is looking for Product Designer to help us...", labels: [{ name: "Marketing", color: "marketing" }, { name: "Design", color: "design" }], logoLetter: "C", logoBg: "#f0e8ff", logoColor: "#7B61FF" },
  { id: 6, title: "Lead Designer", company: "Canva", location: "Ontario, Canada", type: "Full Time", description: "Canva is looking for Lead Designer to help team desi...", labels: [{ name: "Design", color: "design" }, { name: "Business", color: "business" }], logoLetter: "C", logoBg: "#e3f6f5", logoColor: "#00C1B5" },
  { id: 7, title: "Brand Strategist", company: "GoDaddy", location: "Marseille, France", type: "Full Time", description: "GoDaddy is looking for Brand Strategist to join the team...", labels: [{ name: "Marketing", color: "marketing" }], logoLetter: "G", logoBg: "#f0f0f0", logoColor: "#333" },
  { id: 8, title: "Data Analyst", company: "Twitter", location: "San Diego, US", type: "Full Time", description: "Twitter is looking for Data Analyst to help team docu...", labels: [{ name: "Technology", color: "technology" }], logoLetter: "Tw", logoBg: "#e8f6ff", logoColor: "#1DA1F2" },
];

export interface LatestJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  labels: string[];
  logoLetter: string;
  logoBg: string;
  logoColor: string;
}

export const latestJobs: LatestJob[] = [
  { id: 101, title: "Social Media Assistant", company: "Nomad", location: "Paris, France", type: "Full Time", labels: ["Marketing", "Design"], logoLetter: "N", logoBg: "#e8f7f3", logoColor: "#56CDAD" },
  { id: 102, title: "Social Media Assistant", company: "Netlify", location: "Paris, France", type: "Full Time", labels: ["Marketing", "Design"], logoLetter: "Nl", logoBg: "#f0f8ff", logoColor: "#2196F3" },
  { id: 103, title: "Brand Designer", company: "Dropbox", location: "San Francisco, USA", type: "Full Time", labels: ["Marketing", "Design"], logoLetter: "D", logoBg: "#e3f0ff", logoColor: "#0062FF" },
  { id: 104, title: "Brand Designer", company: "Maze", location: "San Francisco, USA", type: "Full Time", labels: ["Marketing", "Design"], logoLetter: "M", logoBg: "#e8f5e9", logoColor: "#4CAF50" },
  { id: 105, title: "Interactive Developer", company: "Terraform", location: "Hamburg, Germany", type: "Full Time", labels: ["Marketing", "Design"], logoLetter: "T", logoBg: "#e8fff5", logoColor: "#21D4EF" },
  { id: 106, title: "Interactive Developer", company: "Udacity", location: "Hamburg, Germany", type: "Full Time", labels: ["Marketing", "Design"], logoLetter: "U", logoBg: "#f0e8ff", logoColor: "#7B61FF" },
  { id: 107, title: "HR Manager", company: "Packer", location: "Lucern, Switzerland", type: "Full Time", labels: ["Marketing", "Design"], logoLetter: "P", logoBg: "#fff0e8", logoColor: "#FF6550" },
  { id: 108, title: "HR Manager", company: "Webflow", location: "Lucern, Switzerland", type: "Full Time", labels: ["Marketing", "Design"], logoLetter: "W", logoBg: "#e8f0ff", logoColor: "#3b5bdb" },
];

export const categories = [
  { name: "Design", jobs: 235, icon: "Palette" as const },
  { name: "Sales", jobs: 756, icon: "TrendingUp" as const },
  { name: "Marketing", jobs: 140, icon: "Megaphone" as const },
  { name: "Finance", jobs: 325, icon: "CreditCard" as const },
  { name: "Technology", jobs: 436, icon: "Monitor" as const },
  { name: "Engineering", jobs: 542, icon: "Wrench" as const },
  { name: "Business", jobs: 211, icon: "BarChart3" as const },
  { name: "Human Resource", jobs: 346, icon: "Users" as const },
];
