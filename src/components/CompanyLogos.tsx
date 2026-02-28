const companies = ["Vodafone", "intel", "TESLA", "AMD", "Talkit"];

const CompanyLogos = () => (
  <section className="bg-card px-4 md:px-10 xl:px-[124px] py-12">
    <p className="text-lg text-qh-black opacity-50 mb-8">Companies we helped grow</p>
    <div className="flex flex-wrap items-center justify-between gap-5 md:gap-9">
      {companies.map((c) => (
        <span key={c} className="font-body font-bold text-xl text-qh-black opacity-30 tracking-wider">{c}</span>
      ))}
    </div>
  </section>
);

export default CompanyLogos;
