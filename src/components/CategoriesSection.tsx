import { ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/jobs";

const CategoriesSection = () => (
  <section className="bg-card px-4 md:px-10 xl:px-[124px] pt-[72px]">
    <div className="flex items-end justify-between mb-12 flex-wrap gap-3">
      <h2 className="font-display font-semibold text-[32px] md:text-[48px] leading-[110%] text-foreground">
        Explore by <span className="text-primary">category</span>
      </h2>
      <a href="#" className="flex items-center gap-2 font-semibold text-primary whitespace-nowrap">
        Show all jobs <ArrowRight className="w-6 h-6" />
      </a>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-8">
      {categories.map((cat, i) => (
        <CategoryCard key={cat.name} {...cat} active={i === 2} />
      ))}
    </div>
  </section>
);

export default CategoriesSection;
