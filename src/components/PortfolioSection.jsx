import { Briefcase, ExternalLink, Image as ImageIcon, Plus, Trash2, BookOpenCheck } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_WORKS = [
  {
    type: "Project",
    title: "Campus Solar Mapping",
    description:
      "Assessed rooftop PV potential using GIS data, proposing a phased installation plan with projected CO₂ savings.",
    link: "https://www.iea.org/reports/solar-pv",
    year: "2024",
    tags: ["Solar", "GIS", "Decarbonization"],
    image: "",
  },
  {
    type: "Activity",
    title: "Green Jobs Career Clinic",
    description:
      "Co-organized a student workshop with practitioners on skills for the clean energy transition.",
    link: "https://www.irena.org/benefits/Jobs",
    year: "2023",
    tags: ["Careers", "Community", "Facilitation"],
    image: "",
  },
];

export default function PortfolioSection() {
  const [whatIDo, setWhatIDo] = useState(
    "I lead and join campus initiatives around renewable energy, climate education, and inclusive green careers."
  );
  const [works, setWorks] = useState([]);

  const [form, setForm] = useState({
    type: "Project",
    title: "",
    description: "",
    link: "",
    year: "2025",
    tags: "",
    image: "",
  });

  useEffect(() => {
    const savedWhat = localStorage.getItem("afrh-uni-whatido");
    const savedWorks = localStorage.getItem("afrh-works");
    setWhatIDo(
      savedWhat ||
        "I lead and join campus initiatives around renewable energy, climate education, and inclusive green careers."
    );
    setWorks(savedWorks ? JSON.parse(savedWorks) : DEFAULT_WORKS);
  }, []);

  useEffect(() => {
    localStorage.setItem("afrh-uni-whatido", whatIDo);
  }, [whatIDo]);

  useEffect(() => {
    localStorage.setItem("afrh-works", JSON.stringify(works));
  }, [works]);

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const addWork = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setWorks([{ ...form, tags }, ...works]);
    setForm({ type: "Project", title: "", description: "", link: "", year: "2025", tags: "", image: "" });
  };

  const removeWork = (idx) => setWorks(works.filter((_, i) => i !== idx));

  return (
    <section id="portfolio" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3d6db] text-[#6a0013]">
            <Briefcase size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4a000e]">Portfolio, Activities & Campus Life</h2>
            <p className="text-[#6a0013]/80">Unggah proyek, kegiatan, dan jelaskan apa yang kamu lakukan di kampus.</p>
          </div>
        </div>

        {/* What I do in University */}
        <div className="mt-8 rounded-2xl border border-[#6a0013]/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#6a0013]">
            <BookOpenCheck size={18} />
            <h3 className="text-lg font-semibold text-[#4a000e]">What I Do in University</h3>
          </div>
          <textarea
            rows={3}
            className="mt-3 w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
            value={whatIDo}
            onChange={(e) => setWhatIDo(e.target.value)}
            placeholder="Ceritakan fokus, organisasi, riset, dan dampak yang kamu jalankan di kampus..."
          />
          <p className="mt-1 text-xs text-[#6a0013]/70">Perubahan disimpan otomatis di perangkat.</p>
        </div>

        {/* Add Work */}
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <form onSubmit={addWork} className="lg:col-span-1 rounded-2xl border border-[#6a0013]/10 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#4a000e]">Tambah Proyek/Kegiatan</h3>
            <div className="mt-3 space-y-3">
              <select
                className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Project</option>
                <option>Activity</option>
              </select>
              <input
                className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                placeholder="Judul"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                rows={3}
                className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                placeholder="Deskripsi singkat"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                  placeholder="Tahun"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                />
                <input
                  className="rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                  placeholder="Link (opsional)"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
              </div>
              <input
                className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                placeholder="Tags dipisah koma (mis. Solar, GIS)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-[#4a000e]">Upload Gambar (opsional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="mt-1 block w-full text-sm text-[#4a000e] file:mr-4 file:rounded-lg file:border-0 file:bg-[#6a0013] file:px-4 file:py-2 file:text-white hover:file:bg-[#4a000e]"
                />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#6a0013] px-3 py-2 text-white hover:bg-[#4a000e]">
                <Plus size={16} /> Tambah
              </button>
            </div>
          </form>

          {/* List */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {works.map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-[#6a0013]/10 p-6 shadow-sm bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6a0013]">{p.year} · {p.type}</span>
                  <div className="flex items-center gap-3">
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#6a0013] hover:text-[#4a000e]"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button onClick={() => removeWork(idx)} className="text-[#6a0013]/70 hover:text-[#4a000e]">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#4a000e]">{p.title}</h3>
                <p className="mt-2 text-sm text-[#6a0013]/80">{p.description}</p>
                {p.image ? (
                  <img src={p.image} alt={p.title} className="mt-4 aspect-video w-full rounded-lg object-cover ring-1 ring-[#6a0013]/10" />
                ) : (
                  <div className="mt-4 flex h-36 w-full items-center justify-center rounded-lg border border-dashed border-[#6a0013]/20 text-[#6a0013]/60">
                    <div className="flex items-center gap-2 text-sm"><ImageIcon size={16} /> No image</div>
                  </div>
                )}
                {p.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t, i) => (
                      <span key={i} className="px-2 py-1 rounded-full bg-[#fdecef] text-[#6a0013] text-xs border border-[#f3d6db]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {works.length === 0 && (
              <p className="text-sm text-[#6a0013]/70">Belum ada entri. Tambah dari panel kiri.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
