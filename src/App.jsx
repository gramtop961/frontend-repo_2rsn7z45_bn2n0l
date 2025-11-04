import AboutSection from "./components/AboutSection";
import InsightsSection from "./components/InsightsSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import { Leaf } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-[#6a0013]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#about" className="inline-flex items-center gap-2 text-[#4a000e] font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f3d6db] text-[#6a0013]">
            <Leaf size={18} />
          </span>
          <span>Antares FRH</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="text-[#6a0013] hover:text-[#4a000e]">About</a>
          <a href="#insights" className="text-[#6a0013] hover:text-[#4a000e]">Insights</a>
          <a href="#portfolio" className="text-[#6a0013] hover:text-[#4a000e]">Portfolio</a>
          <a href="#contact" className="text-[#6a0013] hover:text-[#4a000e]">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#6a0013]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-[#6a0013]/80">
        <p>
          © {new Date().getFullYear()} ANTARES FATHUL RIZKI HARAHAP — Built with a climate-positive mindset.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        <AboutSection />
        <InsightsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
