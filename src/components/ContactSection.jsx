import { Mail, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // In a full app this would POST to a backend. For now, show a friendly confirmation.
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Mail size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">Networking & Collaboration</h2>
            <p className="text-emerald-800/80">Let’s work together on impactful, sustainability-driven ideas.</p>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <form onSubmit={onSubmit} className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-emerald-900/10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-emerald-900">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-emerald-300/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-900">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-emerald-300/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-emerald-900">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-lg border border-emerald-300/60 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Tell me about your idea or collaboration opportunity"
              />
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Send message
            </button>
            {sent && (
              <p className="mt-3 text-sm text-emerald-700">Thanks! Your message has been noted.</p>
            )}
          </form>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-emerald-900/10">
            <h3 className="text-lg font-semibold text-emerald-900">Prefer socials?</h3>
            <p className="mt-1 text-sm text-emerald-800/80">
              I’m open to conversations, mentorship, and project collaborations.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800"
              >
                <Twitter size={18} /> Twitter/X
              </a>
            </div>
            <div className="mt-6 rounded-xl bg-gradient-to-br from-emerald-100 via-emerald-50 to-lime-100 p-4 text-emerald-900">
              Let’s accelerate a fair, resilient energy transition.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
