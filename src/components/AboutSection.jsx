import { Leaf, GraduationCap } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-900">
              ANTARES FATHUL RIZKI HARAHAP
            </h1>
            <p className="mt-3 text-lg text-emerald-800/80">
              Renewable energy advocate • Green jobs enthusiast • Carbon markets explorer
            </p>
            <div className="mt-6 flex items-start gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Leaf size={20} />
              </span>
              <p className="text-emerald-900/80 leading-relaxed">
                I’m a university student driven by the mission to accelerate the just transition to a low-carbon economy. I explore how clean technologies, policy, and markets can unlock inclusive, future-proof careers while protecting our planet.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-emerald-700">
              <GraduationCap size={18} className="shrink-0" />
              <span>
                Academic focus: Energy systems, sustainability transitions, and environmental economics.
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">Renewables</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">Green Jobs</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">Carbon Trading</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">Climate Policy</span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-200 via-lime-200 to-teal-200 blur-2xl opacity-70" />
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=900&q=80"
                alt="Professional portrait"
                className="relative rounded-3xl shadow-xl ring-1 ring-emerald-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
