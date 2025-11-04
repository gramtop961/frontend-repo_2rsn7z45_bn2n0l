import { useEffect, useMemo, useState } from "react";
import { Cog, Palette, Image as ImageIcon, X, Check, Upload, Eraser } from "lucide-react";

const DEFAULT_THEME = {
  primary: "#6a0013",
  primaryDark: "#4a000e",
  bgSoft: "#fdecef",
  bgLight: "#f8e7ea",
  textPrimary: "#2b2324",
};

const PRESETS = [
  {
    name: "Maroon",
    theme: DEFAULT_THEME,
  },
  {
    name: "Royal Blue",
    theme: {
      primary: "#1e3a8a",
      primaryDark: "#172554",
      bgSoft: "#e0e7ff",
      bgLight: "#eef2ff",
      textPrimary: "#0b1220",
    },
  },
  {
    name: "Emerald",
    theme: {
      primary: "#065f46",
      primaryDark: "#064e3b",
      bgSoft: "#d1fae5",
      bgLight: "#ecfdf5",
      textPrimary: "#08231c",
    },
  },
  {
    name: "Sunset",
    theme: {
      primary: "#be123c",
      primaryDark: "#9f1239",
      bgSoft: "#ffe4e6",
      bgLight: "#fff1f2",
      textPrimary: "#2a0a11",
    },
  },
];

function applyThemeVars(theme) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-primary-dark", theme.primaryDark);
  root.style.setProperty("--bg-soft", theme.bgSoft);
  root.style.setProperty("--bg-light", theme.bgLight);
  root.style.setProperty("--text-primary", theme.textPrimary);
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ThemeCustomizer({ theme, setTheme, logo, setLogo }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    applyThemeVars(theme);
    localStorage.setItem("afrh-theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("afrh-logo", JSON.stringify(logo));
  }, [logo]);

  const presetCircles = useMemo(() => PRESETS, []);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await toBase64(file);
    setLogo({ type: "image", value: dataUrl });
  };

  return (
    <div>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] text-white px-4 py-2 shadow-lg hover:bg-[var(--color-primary-dark)] transition"
        aria-label="Open customization panel"
      >
        <Cog size={18} className="animate-spin-slow" />
        <span>Customize</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:max-w-xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="inline-flex items-center gap-2 font-semibold text-[var(--color-primary-dark)]">
                <Palette size={18} />
                Theme & Logo
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-[var(--bg-soft)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 grid gap-6">
              {/* Presets */}
              <div>
                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">Quick Presets</h3>
                <div className="flex flex-wrap gap-3">
                  {presetCircles.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setTheme(p.theme)}
                      className="group relative rounded-xl border overflow-hidden"
                      style={{ borderColor: p.theme.primary }}
                      aria-label={`Use ${p.name} theme`}
                    >
                      <div className="flex">
                        <div className="h-10 w-10" style={{ backgroundColor: p.theme.primary }} />
                        <div className="h-10 w-10" style={{ backgroundColor: p.theme.bgSoft }} />
                        <div className="h-10 w-10" style={{ backgroundColor: p.theme.bgLight }} />
                      </div>
                      <span className="absolute inset-x-0 -bottom-6 group-hover:bottom-0 transition-all text-xs text-white text-center py-1 bg-black/50 backdrop-blur">
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom pickers */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: "primary", label: "Primary" },
                  { key: "primaryDark", label: "Primary (Dark)" },
                  { key: "bgSoft", label: "Background Soft" },
                  { key: "bgLight", label: "Background Light" },
                  { key: "textPrimary", label: "Text" },
                ].map((f) => (
                  <div key={f.key} className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-white">
                    <label className="text-sm font-medium text-[var(--text-primary)]">{f.label}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={theme[f.key]}
                        onChange={(e) => setTheme({ ...theme, [f.key]: e.target.value })}
                        className="w-28 h-9 px-2 rounded-md border text-sm"
                      />
                      <input
                        type="color"
                        value={theme[f.key]}
                        onChange={(e) => setTheme({ ...theme, [f.key]: e.target.value })}
                        className="h-9 w-9 rounded-md cursor-pointer border"
                        aria-label={`${f.label} color`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Logo customization */}
              <div className="grid gap-3">
                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1 inline-flex items-center gap-2">
                  <ImageIcon size={16} /> Logo
                </h3>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="logoType"
                        checked={logo?.type === "text"}
                        onChange={() => setLogo({ type: "text", value: logo?.value || "Antares FRH" })}
                      />
                      Text
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="logoType"
                        checked={logo?.type === "image"}
                        onChange={() => setLogo({ type: "image", value: logo?.value || "" })}
                      />
                      Image
                    </label>
                  </div>
                  {logo?.type === "text" ? (
                    <input
                      type="text"
                      value={logo?.value || ""}
                      onChange={(e) => setLogo({ type: "text", value: e.target.value })}
                      className="flex-1 h-10 px-3 rounded-md border"
                      placeholder="Brand name"
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer hover:bg-[var(--bg-soft)]">
                        <Upload size={16} />
                        <span className="text-sm">Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFile}
                          className="hidden"
                        />
                      </label>
                      {logo?.value ? (
                        <span className="text-xs text-green-700 inline-flex items-center gap-1"><Check size={14} /> Image set</span>
                      ) : (
                        <span className="text-xs text-gray-500">No image</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Preview:</span>
                    <div className="h-10 px-4 inline-flex items-center gap-2 rounded-full border bg-[var(--bg-soft)]">
                      {logo?.type === "image" && logo?.value ? (
                        <img src={logo.value} alt="logo" className="h-6 w-6 object-contain" />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-[var(--color-primary)]" />)
                      }
                      <span className="font-semibold text-[var(--color-primary-dark)]">
                        {logo?.type === "text" ? (logo?.value || "Brand") : "Brand"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setLogo({ type: "text", value: "Antares FRH" });
                      setTheme(DEFAULT_THEME);
                    }}
                    className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border hover:bg-[var(--bg-soft)]"
                  >
                    <Eraser size={16} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-spin-slow { animation: spin 6s linear infinite; }
      `}</style>
    </div>
  );
}
