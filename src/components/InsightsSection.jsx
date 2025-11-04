import { BookOpen, PenSquare, ExternalLink, Quote, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_BLOGS = [
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
];

const DEFAULT_QUOTES = [
  {
    text: "The investor’s chief problem—and even his worst enemy—is likely to be himself.",
    author: "Benjamin Graham",
  },
  {
    text: "Price is what you pay. Value is what you get.",
    author: "Warren Buffett",
  },
  {
    text: "The curious task of economics is to demonstrate to men how little they really know about what they imagine they can design.",
    author: "F. A. Hayek",
  },
];

export default function InsightsSection() {
  const [blogs, setBlogs] = useState([]);
  const [insights, setInsights] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", link: "", tag: "General" });
  const [insightInput, setInsightInput] = useState("");
  const [quoteForm, setQuoteForm] = useState({ text: "", author: "" });

  // Load from localStorage
  useEffect(() => {
    const b = localStorage.getItem("afrh-blog");
    const i = localStorage.getItem("afrh-insights");
    const q = localStorage.getItem("afrh-quotes");
    setBlogs(b ? JSON.parse(b) : DEFAULT_BLOGS);
    setInsights(i ? JSON.parse(i) : []);
    setQuotes(q ? JSON.parse(q) : DEFAULT_QUOTES);
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem("afrh-blog", JSON.stringify(blogs));
  }, [blogs]);
  useEffect(() => {
    localStorage.setItem("afrh-insights", JSON.stringify(insights));
  }, [insights]);
  useEffect(() => {
    localStorage.setItem("afrh-quotes", JSON.stringify(quotes));
  }, [quotes]);

  const addBlog = (e) => {
    e.preventDefault();
    if (!blogForm.title.trim()) return;
    setBlogs([{ ...blogForm }, ...blogs]);
    setBlogForm({ title: "", excerpt: "", link: "", tag: "General" });
  };

  const addInsight = (e) => {
    e.preventDefault();
    if (!insightInput.trim()) return;
    setInsights([{ text: insightInput, date: new Date().toISOString() }, ...insights]);
    setInsightInput("");
  };

  const addQuote = (e) => {
    e.preventDefault();
    if (!quoteForm.text.trim() || !quoteForm.author.trim()) return;
    setQuotes([{ ...quoteForm }, ...quotes]);
    setQuoteForm({ text: "", author: "" });
  };

  const removeBlog = (idx) => setBlogs(blogs.filter((_, i) => i !== idx));
  const removeInsight = (idx) => setInsights(insights.filter((_, i) => i !== idx));
  const removeQuote = (idx) => setQuotes(quotes.filter((_, i) => i !== idx));

  const formattedInsights = useMemo(
    () =>
      insights.map((it) => ({
        ...it,
        when: new Date(it.date || Date.now()).toLocaleDateString(),
      })),
    [insights]
  );

  return (
    <section id="insights" className="bg-gradient-to-b from-white to-[#f8e7ea]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3d6db] text-[#6a0013]">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4a000e]">Blog, Daily Insights & Quotes</h2>
            <p className="text-[#6a0013]/80">Tulis pemikiran harianmu, tulis blog singkat, dan kumpulkan kutipan dari pemikir besar.</p>
          </div>
        </div>

        {/* Blog composer */}
        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <form onSubmit={addBlog} className="lg:col-span-1 rounded-2xl border border-[#6a0013]/10 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#4a000e]">Tulis Blog</h3>
            <div className="mt-3 space-y-3">
              <input
                className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                placeholder="Judul"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              />
              <textarea
                rows={3}
                className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                placeholder="Ringkasan singkat"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
              />
              <input
                className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                placeholder="Link (opsional)"
                value={blogForm.link}
                onChange={(e) => setBlogForm({ ...blogForm, link: e.target.value })}
              />
              <input
                className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                placeholder="Tag (mis. Carbon, Careers)"
                value={blogForm.tag}
                onChange={(e) => setBlogForm({ ...blogForm, tag: e.target.value })}
              />
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#6a0013] px-3 py-2 text-white hover:bg-[#4a000e]">
                <Plus size={16} /> Publikasikan
              </button>
            </div>
          </form>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {/* Daily insights */}
            <div className="rounded-2xl border border-[#6a0013]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[#6a0013]">
                <PenSquare size={18} />
                <h3 className="text-lg font-semibold text-[#4a000e]">Daily Insights</h3>
              </div>
              <form onSubmit={addInsight} className="mt-3 flex gap-2">
                <input
                  className="flex-1 rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                  placeholder="Catatan singkat hari ini..."
                  value={insightInput}
                  onChange={(e) => setInsightInput(e.target.value)}
                />
                <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#6a0013] px-3 py-2 text-white hover:bg-[#4a000e]">
                  <Plus size={16} />
                </button>
              </form>
              <ul className="mt-4 space-y-3">
                {formattedInsights.length === 0 && (
                  <li className="text-sm text-[#6a0013]/70">Belum ada insight. Tulis yang pertama!</li>
                )}
                {formattedInsights.map((it, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-3 rounded-lg border border-[#6a0013]/10 p-3">
                    <div>
                      <p className="text-sm text-[#4a000e]">{it.text}</p>
                      <p className="text-xs text-[#6a0013]/60">{it.when}</p>
                    </div>
                    <button onClick={() => removeInsight(idx)} className="text-[#6a0013]/70 hover:text-[#4a000e]">
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quotes */}
            <div className="rounded-2xl border border-[#6a0013]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[#6a0013]">
                <Quote size={18} />
                <h3 className="text-lg font-semibold text-[#4a000e]">Quotes</h3>
              </div>
              <form onSubmit={addQuote} className="mt-3 grid grid-cols-1 gap-2">
                <input
                  className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                  placeholder="Isi kutipan"
                  value={quoteForm.text}
                  onChange={(e) => setQuoteForm({ ...quoteForm, text: e.target.value })}
                />
                <input
                  className="w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                  placeholder="Penulis (mis. Benjamin Graham)"
                  value={quoteForm.author}
                  onChange={(e) => setQuoteForm({ ...quoteForm, author: e.target.value })}
                />
                <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#6a0013] px-3 py-2 text-white hover:bg-[#4a000e]">
                  <Plus size={16} /> Tambah Quote
                </button>
              </form>
              <ul className="mt-4 space-y-3">
                {quotes.map((q, idx) => (
                  <li key={idx} className="rounded-lg border border-[#6a0013]/10 p-3">
                    <p className="text-[#4a000e]">“{q.text}”</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm text-[#6a0013]/80">— {q.author}</span>
                      <button onClick={() => removeQuote(idx)} className="text-[#6a0013]/70 hover:text-[#4a000e]">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Blog list */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-[#4a000e]">Blog Posts</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {blogs.map((p, idx) => (
              <article
                key={idx}
                className="group rounded-2xl border border-[#6a0013]/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#6a0013]">
                    <PenSquare size={14} />
                    <span className="font-medium">{p.tag}</span>
                  </div>
                  <button onClick={() => removeBlog(idx)} className="text-[#6a0013]/70 hover:text-[#4a000e]">
                    <Trash2 size={16} />
                  </button>
                </div>
                <h4 className="mt-3 text-lg font-semibold text-[#4a000e] group-hover:text-[#6a0013]">
                  {p.title}
                </h4>
                <p className="mt-2 text-sm text-[#6a0013]/80">{p.excerpt}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[#6a0013] hover:text-[#4a000e]"
                  >
                    Read more <ExternalLink size={16} />
                  </a>
                )}
              </article>
            ))}
            {blogs.length === 0 && (
              <p className="text-sm text-[#6a0013]/70">Belum ada blog. Tulis dari panel kiri.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
