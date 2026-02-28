const CTASection = () => (
  <section className="bg-card px-4 md:px-10 xl:px-[124px] py-[72px]">
    <div className="bg-primary flex flex-col lg:flex-row items-center relative overflow-hidden min-h-[414px]">
      <div className="p-12 lg:p-[92px_70px] z-[2] relative max-w-[460px] text-center lg:text-left">
        <h2 className="font-display font-semibold text-[32px] lg:text-[48px] leading-[110%] text-primary-foreground mb-6">
          Start posting jobs today
        </h2>
        <p className="font-medium text-base leading-[160%] text-primary-foreground mb-6">
          Start posting jobs for only $10.
        </p>
        <button className="bg-card text-primary font-bold text-base border-none px-6 py-3 w-full lg:w-auto">
          Sign Up For Free
        </button>
      </div>

      {/* Mini dashboard */}
      <div className="static lg:absolute lg:right-[-20px] lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[520px] bg-card shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-5 rounded mx-4 lg:mx-0 mb-4 lg:mb-0">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
          <span className="font-logo font-bold text-sm text-qh-black">QuickHire</span>
          <button className="bg-primary text-primary-foreground border-none px-2.5 py-1 text-xs font-body">+ Post a Job</button>
        </div>
        <div className="flex gap-2 mb-3 flex-wrap">
          {[
            { num: 76, text: "New candidates\nto review", cls: "bg-primary" },
            { num: 3, text: "Schedule\nfor today", cls: "bg-qh-green" },
            { num: 24, text: "Messages\nreceived", cls: "bg-qh-blue" },
          ].map((s) => (
            <div key={s.num} className={`${s.cls} inline-flex items-center gap-1.5 px-2.5 py-1.5 text-primary-foreground font-semibold text-xs`}>
              <span className="text-lg">{s.num}</span>
              <span className="whitespace-pre-line">{s.text}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex-[2]">
            <div className="text-[11px] font-semibold text-foreground mb-1.5">Job statistics</div>
            <div className="flex items-end gap-1.5 h-[60px]">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => {
                const yellow = [40, 12, 38, 20, 46, 15, 4][i];
                const purple = [40, 45, 18, 55, 22, 15, 33][i];
                return (
                  <div key={d} className="flex flex-col items-center gap-0.5">
                    <div className="flex flex-col gap-px">
                      <div className="w-3.5 rounded-sm bg-qh-yellow" style={{ height: yellow }} />
                      <div className="w-3.5 rounded-sm bg-primary" style={{ height: purple }} />
                    </div>
                    <span className="text-[9px] text-text-light">{d}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="border border-border p-2">
              <div className="text-[10px] font-semibold text-foreground">Job Open</div>
              <div className="text-lg font-bold text-foreground">12</div>
              <div className="text-[9px] text-text-light">Jobs Opened</div>
            </div>
            <div className="border border-border p-2">
              <div className="text-[10px] font-semibold text-foreground">Applicants Summary</div>
              <div className="text-lg font-bold text-foreground">67</div>
              <div className="text-[9px] text-text-light">Applicants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
