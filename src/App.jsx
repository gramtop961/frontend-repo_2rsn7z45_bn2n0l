import { useEffect, useMemo, useState } from "react";
import AboutSection from "./components/AboutSection";
import InsightsSection from "./components/InsightsSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import ThemeCustomizer from "./components/ThemeCustomizer";
import SocialLinksEditor from "./components/SocialLinksEditor";
import BackgroundPalette from "./components/BackgroundPalette";
import EditLock from "./components/EditLock";
import { Leaf, Linkedin, Twitter, MessageCircle } from "lucide-react";

const DEFAULT_THEME = {
  primary: "#6a0013",
  primaryDark: "#4a000e",
  bgSoft: "#fdecef",
  bgLight: "#f8e7ea",
  textPrimary: "#2b2324",
};

const DEFAULT_BG = { from: "#fdecef", to: "#f8e7ea", preset: "maroon" };

function Header({ logo, social }) {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-[var(--color-primary)]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#about" className="inline-flex items-center gap-2 text-[var(--color-primary-dark)] font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--color-primary)]">
            {logo?.type === "image" && logo?.value ? (
              <img src={logo.value} alt="logo" className="h-5 w-5 object-contain" />
            ) : logo?.type === "text" ? (
              <Leaf size={18} />
            ) : (
              <Leaf size={18} />
            )}
          </span>
          <span>
            {logo?.type === "text" ? (logo?.value || "Antares FRH") : "Antares FRH"}
          </span>
        </a>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">About</a>
            <a href="#insights" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">Insights</a>
            <a href="#portfolio" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">Portfolio</a>
            <a href="#contact" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            {social?.linkedin ? (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--bg-soft)] text-[var(--color-primary)] hover:bg-[var(--bg-light)]"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            ) : null}
            {social?.twitter ? (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--bg-soft)] text-[var(--color-primary)] hover:bg-[var(--bg-light)]"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            ) : null}
            {social?.whatsapp ? (
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--bg-soft)] text-[var(--color-primary)] hover:bg-[var(--bg-light)]"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-primary)]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-[var(--color-primary)]/80">
        <p>
          © {new Date().getFullYear()} ANTARES FATHUL RIZKI HARAHAP — Built with a climate-positive mindset.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [logo, setLogo] = useState({ type: "text", value: "Antares FRH" });
  const [social, setSocial] = useState({ linkedin: "", whatsapp: "", twitter: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [bg, setBg] = useState(DEFAULT_BG);

  // Load persisted settings
  useEffect(() => {
    const savedTheme = localStorage.getItem("afrh-theme");
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch {}
    }
    const savedLogo = localStorage.getItem("afrh-logo");
    if (savedLogo) {
      try {
        setLogo(JSON.parse(savedLogo));
      } catch {}
    }
    const savedSocial = localStorage.getItem("afrh-social");
    if (savedSocial) {
      try {
        setSocial(JSON.parse(savedSocial));
      } catch {}
    }
    const savedBg = localStorage.getItem("afrh-bg");
    if (savedBg) {
      try {
        const parsed = JSON.parse(savedBg);
        setBg({ from: parsed.from || DEFAULT_BG.from, to: parsed.to || DEFAULT_BG.to, preset: parsed.preset || "custom" });
      } catch {}
    }
  }, []);

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", theme.primary);
    root.style.setProperty("--color-primary-dark", theme.primaryDark);
    root.style.setProperty("--bg-soft", theme.bgSoft);
    root.style.setProperty("--bg-light", theme.bgLight);
    root.style.setProperty("--text-primary", theme.textPrimary);
  }, [theme]);

  // Apply background variables always (even if editor closed)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--app-bg-from", bg.from);
    root.style.setProperty("--app-bg-to", bg.to);
  }, [bg]);

  const appBgStyle = useMemo(
    () => ({ background: `linear-gradient(135deg, var(--app-bg-from, ${bg.from}) 0%, var(--app-bg-to, ${bg.to}) 100%)` }),
    [bg]
  );

  return (
    <div className="min-h-screen font-inter text-[var(--text-primary)]" style={appBgStyle}>
      <Header logo={logo} social={social} />
      <main>
        <AboutSection />
        <InsightsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Editors: gated by padlock */}
      {isEdit && (
        <>
          <ThemeCustomizer theme={theme} setTheme={setTheme} logo={logo} setLogo={setLogo} />
          <SocialLinksEditor social={social} setSocial={setSocial} />
        </>
      )}
      <BackgroundPalette isEdit={isEdit} />
      <EditLock isEdit={isEdit} setIsEdit={setIsEdit} />
    </div>
  );
}
