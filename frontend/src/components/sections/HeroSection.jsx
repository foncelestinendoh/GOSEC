import React from "react";
import { Button } from "@/components/ui/button";
import { sections } from "@/mock/gosecMock";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = ({ onOpenJoin, onOpenMember }) => {
  const { titleEn, titleFr, subtitleEn, subtitleFr } = sections.hero;
  const { language } = useLanguage();
  const title = language === "en" ? titleEn : titleFr;
  const subtitle = language === "en" ? subtitleEn : subtitleFr;

  return (
    <section
      id="hero"
      className="relative pt-[120px] pb-[80px] md:pt-[140px] md:pb-[100px]"
    >
      <div className="container max-w-[1100px] mx-auto px-4 flex items-center justify-start">
        <div data-aos="fade-up" className="hero-panel space-y-6 max-w-2xl">
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
