export interface Job {
  id: string; // Changed to string as per "uuid-string" in docs
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: string;
  salary: string;
  logoURL: string;
  createdAt?: string;

  // UI Only / Fallback fields
  labels?: { name: string; color: "marketing" | "design" | "business" | "technology" }[];
  logoLetter?: string;
  logoBg?: string;
  logoColor?: string;
}

export const featuredJobs: Job[] = [];

export interface LatestJob extends Job {}

export const latestJobs: LatestJob[] = [];

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
