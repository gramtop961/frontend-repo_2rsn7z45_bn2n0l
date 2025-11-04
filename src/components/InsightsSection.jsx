import { BookOpen, PenSquare, ExternalLink, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Why Green Jobs Are the Future of Work",
    excerpt:
      "From policy to projects, discover how the clean economy is opening inclusive career pathways.",
    link: "https://www.ilo.org/global/topics/green-jobs",
    tag: "Careers",
  },
  {
    title: "Understanding Carbon Markets in 5 Minutes",
    excerpt:
      "Offsets, compliance vs. voluntary markets, and how quality safeguards build trust.",
    link: "https://www.worldbank.org/en/programs/pmr",
    tag: "Carbon",
  },
  {
    title: "Rooftop Solar: A Community Energy Revolution",
    excerpt:
      "How localized solar projects empower neighborhoods and cut energy bills.",
    link: "https://www.iea.org/reports/solar-pv",
    tag: "Renewables",
  },
];

const resources = [
  {
    name: "IEA – Renewable Energy Reports",
    link: "https://www.iea.org/topics/renewables",
  },
  {
    name: "IRENA – Green Skills & Jobs",
    link: "https://www.irena.org/benefits/Jobs",
  },
  {
    name: "UNDP – Carbon Pricing & Markets",
    link: "https://climatepromise.undp.org/",
  },
  {
    name: "OpenLearn – Sustainability Courses",
    link: "https://www.open.edu/openlearn/",
  },
];

export default function InsightsSection() {
  return (
    <section id="insights" className="bg-gradient-to-b from-white to-[#f8e7ea]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3d6db] text-[#6a0013]">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4a000e]">Blog & Insights</h2>
            <p className="text-[#6a0013]/80">Reflections on renewables, careers, and carbon markets.</p>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl border border-[#6a0013]/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-xs text-[#6a0013]">
                <PenSquare size={14} />
                <span className="font-medium">{p.tag}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[#4a000e] group-hover:text-[#6a0013]">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-[#6a0013]/80">{p.excerpt}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[#6a0013] hover:text-[#4a000e]"
              >
                Read more <ExternalLink size={16} />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-[#4a000e]">Resources</h3>
          <p className="text-sm text-[#6a0013]/80">Curated links to learn, explore, and upskill.</p>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((r) => (
              <li key={r.name}>
                <a
                  href={r.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[#6a0013]/10 bg-white px-4 py-3 text-[#6a0013] hover:text-[#4a000e] hover:border-[#6a0013]/30"
                >
                  <span className="text-sm font-medium">{r.name}</span>
                  <ArrowRight size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
