import { Mail, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-[#f8e7ea] to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3d6db] text-[#6a0013]">
            <Mail size={20} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4a000e]">Networking & Collaboration</h2>
            <p className="text-[#6a0013]/80">Let’s work together on impactful, sustainability-driven ideas.</p>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <form onSubmit={onSubmit} className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-[#6a0013]/10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4a000e]">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4a000e]">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#4a000e]">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-lg border border-[#6a0013]/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a3001f]"
                placeholder="Tell me about your idea or collaboration opportunity"
              />
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#6a0013] px-4 py-2 text-white hover:bg-[#4a000e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a3001f]"
            >
              Send message
            </button>
            {sent && (
              <p className="mt-3 text-sm text-[#6a0013]">Thanks! Your message has been noted.</p>
            )}
          </form>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#6a0013]/10">
            <h3 className="text-lg font-semibold text-[#4a000e]">Prefer socials?</h3>
            <p className="mt-1 text-sm text-[#6a0013]/80">
              I’m open to conversations, mentorship, and project collaborations.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#6a0013] hover:text-[#4a000e]"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#6a0013] hover:text-[#4a000e]"
              >
                <Twitter size={18} /> Twitter/X
              </a>
            </div>
            <div className="mt-6 rounded-xl bg-gradient-to-br from-[#fdecef] via-[#fff5f7] to-[#fdecef] p-4 text-[#4a000e]">
              Let’s accelerate a fair, resilient energy transition.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
