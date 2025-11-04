import { useEffect, useState } from "react";
import { Link as LinkIcon, Save, X, Linkedin, Twitter, MessageCircle } from "lucide-react";

const STORAGE_KEY = "afrh-social";

export default function SocialLinksEditor({ social, setSocial }) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(social || { linkedin: "", whatsapp: "", twitter: "" });

  useEffect(() => {
    setLocal(social || { linkedin: "", whatsapp: "", twitter: "" });
  }, [social]);

  const handleChange = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
  };

  const normalizeWhatsapp = (value) => {
    // Accept full wa.me link or phone; store as full wa.me URL for consistency
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("http")) return trimmed;
    const digits = trimmed.replace(/[^0-9]/g, "");
    if (!digits) return "";
    return `https://wa.me/${digits}`;
  };

  const save = () => {
    const payload = {
      linkedin: local.linkedin.trim(),
      twitter: local.twitter.trim(),
      whatsapp: normalizeWhatsapp(local.whatsapp),
    };
    setSocial(payload);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
    setOpen(false);
  };

  const reset = () => {
    const empty = { linkedin: "", whatsapp: "", twitter: "" };
    setLocal(empty);
    setSocial(empty);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(empty)); } catch {}
  };

  return (
    <>
      {/* Floating opener */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] text-white px-4 py-2 shadow-lg hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
        aria-label="Edit social links"
      >
        <LinkIcon size={18} />
        Social
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:w-[520px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl border border-[var(--color-primary)]/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[var(--color-primary)]/10 bg-[var(--bg-light)]">
              <div className="flex items-center gap-2 text-[var(--color-primary-dark)] font-semibold">
                <LinkIcon size={18} />
                Social Links
              </div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-[var(--bg-soft)] text-[var(--color-primary-dark)]"
                aria-label="Close social links editor"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-4 sm:px-6 py-5 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-primary-dark)]">LinkedIn URL</label>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 inline-flex items-center justify-center rounded-md bg-[var(--bg-soft)] text-[var(--color-primary)]">
                    <Linkedin size={18} />
                  </div>
                  <input
                    type="url"
                    inputMode="url"
                    placeholder="https://www.linkedin.com/in/username"
                    className="flex-1 h-10 rounded-md border border-[var(--color-primary)]/20 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={local.linkedin}
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-primary-dark)]">Twitter/X URL</label>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 inline-flex items-center justify-center rounded-md bg-[var(--bg-soft)] text-[var(--color-primary)]">
                    <Twitter size={18} />
                  </div>
                  <input
                    type="url"
                    inputMode="url"
                    placeholder="https://twitter.com/username"
                    className="flex-1 h-10 rounded-md border border-[var(--color-primary)]/20 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={local.twitter}
                    onChange={(e) => handleChange("twitter", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-[var(--color-primary-dark)]">WhatsApp</label>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 inline-flex items-center justify-center rounded-md bg-[var(--bg-soft)] text-[var(--color-primary)]">
                    <MessageCircle size={18} />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Phone (e.g., 628123456789) or wa.me link"
                    className="flex-1 h-10 rounded-md border border-[var(--color-primary)]/20 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={local.whatsapp}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                  />
                </div>
                <p className="text-xs text-[var(--color-primary)]/70">We&apos;ll format it as a wa.me link automatically.</p>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4 border-t border-[var(--color-primary)]/10 bg-[var(--bg-light)] flex items-center justify-between">
              <button
                onClick={reset}
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                type="button"
              >
                Reset
              </button>
              <button
                onClick={save}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-primary)] text-white px-4 h-9 shadow hover:bg-[var(--color-primary-dark)]"
                type="button"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
