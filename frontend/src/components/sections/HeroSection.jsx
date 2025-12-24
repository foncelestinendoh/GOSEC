import React from "react";
import { Button } from "@/components/ui/button";
import { sections } from "@/mock/gosecMock";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = ({ onOpenJoin, onOpenMember }) => {
  const { titleEn, titleFr, subtitleEn, subtitleFr } = sections.hero;
  const { language } = useLanguage();
  const isEn = language === "en";
  const title = isEn ? titleEn : titleFr;
  const subtitle = isEn ? subtitleEn : subtitleFr;
  const heroLabel = isEn
    ? "GOSEC – Gatineau Ottawa Social Elite Club"
    : "GOSEC – Club Social d’Élite Gatineau Ottawa";
  const joinLabel = isEn ? "Join Our Programs" : "Rejoindre un programme";
  const memberLabel = isEn ? "Donate" : "Faire un don";

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[30px] pb-[80px] md:pt-[35px] md:pb-[90px]"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/18492240/pexels-photo-18492240.jpeg?w=1800&auto=compress&cs=tinysrgb"
          alt="Afro-descendant youth and families smiling together in a vibrant community scene"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.78)]" />
      </div>
      <div className="container max-w-[1100px] mx-auto px-4 flex items-center justify-center">
        <div data-aos="fade-up" className="hero-panel space-y-5 max-w-2xl mx-auto text-center">
          <p className="uppercase tracking-[0.12em] text-xs text-[var(--text-secondary)]">
            {heroLabel}
          </p>
          <h1 className="heading-1 text-black">
            {title}
          </h1>
          <p className="body-medium max-w-xl text-black/80">
            {subtitle}
          </p>
          <p className="body-small max-w-xl text-black/70">
            {isEn
              ? "Using soccer, culture, and education to support youth, families, and newcomers across Gatineau and Ottawa."
              : "Utiliser le soccer, la culture et l’éducation pour soutenir les jeunes, les familles et les nouveaux arrivants à Gatineau et Ottawa."}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              className="btn-cta button-text bg-[#e53935] hover:bg-[#c62828] text-white"
              onClick={onOpenJoin}
            >
              {joinLabel}
            </Button>
            <Button
              variant="outline"
              className="btn-secondary button-text border border-[#1565c0] text-[#1565c0] hover:bg-[#1565c0] hover:text-white"
              onClick={onOpenMember}
            >
              {memberLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
