import { useState } from "react";
import { Facebook, Instagram, Globe, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-qh-black text-primary-foreground px-4 md:px-10 xl:px-[124px] pt-16 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_2fr] gap-8 xl:gap-[60px] pb-12 border-b border-primary-foreground/10 mb-10">
        <div>
          <span className="font-logo font-bold text-2xl block mb-4">QuickHire</span>
          <p className="text-base leading-[160%] text-border">
            Great platform for the job seeker that passionate about startups. Find your dream job easier.
          </p>
        </div>
        <div>
          <p className="font-semibold text-lg mb-6">About</p>
          <ul className="flex flex-col gap-4 list-none">
            {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map((l) => (
              <li key={l}><a href="#" className="text-base text-border hover:text-primary-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-lg mb-6">Resources</p>
          <ul className="flex flex-col gap-4 list-none">
            {["Help Docs", "Guide", "Updates", "Contact Us"].map((l) => (
              <li key={l}><a href="#" className="text-base text-border hover:text-primary-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-lg mb-6">Get job notifications</p>
          <p className="text-base leading-[160%] text-border mb-4">The latest job news, articles, sent to your inbox weekly.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-border bg-card font-body text-base text-text-light"
            />
            <button className="bg-primary text-primary-foreground font-bold text-base border-none px-6 py-3">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-base font-medium text-primary-foreground opacity-50">2025 @ QuickHire. All rights reserved.</p>
        <div className="flex gap-4">
          {[Facebook, Instagram, Globe, Linkedin, Twitter].map((Icon, i) => (
            <div key={i} className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center cursor-pointer">
              <Icon className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
