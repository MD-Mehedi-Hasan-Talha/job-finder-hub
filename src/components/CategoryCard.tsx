import { ArrowRight, BarChart3, CreditCard, Megaphone, Monitor, Palette, TrendingUp, Users, Wrench } from "lucide-react";

const iconMap = {
  Palette, TrendingUp, Megaphone, CreditCard, Monitor, Wrench, BarChart3, Users,
} as const;

interface CategoryCardProps {
  name: string;
  jobs: number;
  icon: keyof typeof iconMap;
  active?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({ name, jobs, icon, active, onClick }: CategoryCardProps) => {
  const Icon = iconMap[icon];

  return (
    <div
      onClick={onClick}
      className={`group border border-border p-8 cursor-pointer transition-all
        ${active ? "bg-primary border-primary" : "bg-card hover:bg-primary hover:border-primary"}
      `}
    >
      <div className={`mb-8 ${active ? "text-primary-foreground" : "text-primary group-hover:text-primary-foreground"}`}>
        <Icon className="w-12 h-12" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className={`font-display font-semibold text-2xl leading-[120%] mb-3 ${active ? "text-primary-foreground" : "text-foreground group-hover:text-primary-foreground"}`}>
            {name}
          </p>
          <span className={`text-lg ${active ? "text-primary-foreground" : "text-text-light group-hover:text-primary-foreground"}`}>
            {jobs} jobs available
          </span>
        </div>
        <ArrowRight className={`w-6 h-6 ${active ? "text-primary-foreground" : "text-foreground group-hover:text-primary-foreground"}`} />
      </div>
    </div>
  );
};

export default CategoryCard;
