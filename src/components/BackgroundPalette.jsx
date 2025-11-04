import { useEffect, useMemo, useState } from "react";
import { Palette } from "lucide-react";

const PRESETS = [
  {
    id: "maroon",
    name: "Maroon Mist",
    from: "#fdecef",
    to: "#f8e7ea",
  },
  {
    id: "royal",
    name: "Royal Sky",
    from: "#eef4ff",
    to: "#e6edff",
  },
  {
    id: "emerald",
    name: "Emerald Sea",
    from: "#e9fbf3",
    to: "#def7ec",
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    from: "#fff2e6",
    to: "#ffe5d1",
  },
  {
    id: "noir",
    name: "Noir Mist",
    from: "#f6f7f9",
    to: "#f1f3f5",
  },
];

export default function BackgroundPalette({ isEdit }) {
  const [open, setOpen] = useState(false);
  const [bg, setBg] = useState({ from: "#fdecef", to: "#f8e7ea", preset: "maroon" });

  useEffect(() => {
    const saved = localStorage.getItem("afrh-bg");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBg({ from: parsed.from, to: parsed.to, preset: parsed.preset || "custom" });
      } catch {}
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--app-bg-from", bg.from);
    root.style.setProperty("--app-bg-to", bg.to);
  }, [bg]);

  const gradientPreview = useMemo(
    () => ({ background: `linear-gradient(135deg, ${bg.from} 0%, ${bg.to} 100%)` }),
    [bg]
  );

  const applyPreset = (p) => {
    setBg({ from: p.from, to: p.to, preset: p.id });
    localStorage.setItem("afrh-bg", JSON.stringify({ from: p.from, to: p.to, preset: p.id }));
  };

  const saveCustom = () => {
    localStorage.setItem("afrh-bg", JSON.stringify({ ...bg, preset: "custom" }));
  };

  if (!isEdit) return null;

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-[5.5rem] z-50">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 shadow-lg border bg-white text-[var(--color-primary)] border-[var(--color-primary)]/20 hover:bg-[var(--bg-soft)]"
          aria-label="Customize Background"
        >
          <Palette size={16} />
          <span className="text-sm font-medium">Background</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl border border-black/5 overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center gap-2">
              <Palette size={16} className="text-[var(--color-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Background Palette</h3>
            </div>

            <div className="p-4 grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-[var(--text-primary)]/70 mb-2">Presets</p>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p)}
                      className={`h-16 rounded-lg border overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
                        bg.preset === p.id ? "ring-2 ring-[var(--color-primary)]/50" : ""
                      }`}
                      style={{ background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)` }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-[var(--text-primary)]/70 mb-2">Custom</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-[var(--text-primary)]/70 mb-1">From</label>
                      <input
                        type="color"
                        value={bg.from}
                        onChange={(e) => setBg((s) => ({ ...s, from: e.target.value, preset: "custom" }))}
                        className="h-9 w-full rounded-md border border-black/10"
                        aria-label="From color"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-[var(--text-primary)]/70 mb-1">To</label>
                      <input
                        type="color"
                        value={bg.to}
                        onChange={(e) => setBg((s) => ({ ...s, to: e.target.value, preset: "custom" }))}
                        className="h-9 w-full rounded-md border border-black/10"
                        aria-label="To color"
                      />
                    </div>
                  </div>
                  <div className="h-16 rounded-lg border overflow-hidden" style={gradientPreview} />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        const def = PRESETS[0];
                        applyPreset(def);
                      }}
                      className="text-xs px-3 py-1.5 rounded-md border border-black/10 hover:bg-white"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => {
                        saveCustom();
                        setOpen(false);
                      }}
                      className="text-sm px-3 py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 border-t bg-[var(--bg-soft)]/60 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="text-sm px-3 py-1.5 rounded-md border border-black/10 hover:bg-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
