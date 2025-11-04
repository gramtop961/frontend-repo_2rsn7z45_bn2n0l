import { Briefcase, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Campus Solar Mapping",
    description:
      "Assessed rooftop PV potential using GIS data, proposing a phased installation plan with projected CO₂ savings.",
    link: "https://www.iea.org/reports/solar-pv",
    year: "2024",
    tags: ["Solar", "GIS", "Decarbonization"],
  },
  {
    title: "Green Jobs Career Clinic",
    description:
      "Co-organized a student workshop with practitioners on skills for the clean energy transition.",
    link: "https://www.irena.org/benefits/Jobs",
    year: "2023",
    tags: ["Careers", "Community", "Facilitation"],
  },
  {
    title: "Carbon Market 101 Webinar",
    description:
      "Presented fundamentals of carbon pricing, MRV, and integrity frameworks for offsets.",
    link: "https://climatepromise.undp.org/",
    year: "2023",
    tags: ["Carbon", "Policy", "MRV"],
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3d6db] text-[#6a0013]">
            <Briefcase size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4a000e]">Portfolio & Experience</h2>
            <p className="text-[#6a0013]/80">Selected projects, research, and events.</p>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#6a0013]/10 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#6a0013]">{p.year}</span>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#6a0013] hover:text-[#4a000e]"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[#4a000e]">{p.title}</h3>
              <p className="mt-2 text-sm text-[#6a0013]/80">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-1 rounded-full bg-[#fdecef] text-[#6a0013] text-xs border border-[#f3d6db]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
