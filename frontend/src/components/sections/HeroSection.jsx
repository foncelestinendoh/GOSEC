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
  const memberLabel = isEn ? "Become a Member" : "Devenir membre";

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[110px] pb-[80px] md:pt-[130px] md:pb-[90px]"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1604651684573-05470013b3b9?auto=format&fit=crop&w=1600&q=80"
          alt="Community members playing soccer together in a park"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[rgba(250,255,238,0.9)]" />
      </div>
      <div className="container max-w-[1100px] mx-auto px-4 flex items-center justify-start">
        <div data-aos="fade-up" className="hero-panel space-y-5 max-w-2xl">
          <p className="uppercase tracking-[0.12em] text-xs text-[var(--text-secondary)]">
            GOSEC – Gatineau Ottawa Social Elite Club
          </p>
          <h1 className="heading-1">
            {title}
          </h1>
          <p className="body-medium max-w-xl">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              className="btn-cta button-text"
              onClick={onOpenJoin}
            >
              Join Our Programs / Rejoindre un programme
            </Button>
            <Button
              variant="outline"
              className="btn-secondary button-text border-0"
              onClick={onOpenMember}
            >
              Become a Member / Devenir membre
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
