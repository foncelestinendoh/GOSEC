import React from "react";
import { Button } from "@/components/ui/button";
import { sections } from "@/mock/gosecMock";

export const HeroSection = ({ onOpenJoin, onOpenMember }) => {
  const { titleEn, titleFr, subtitleEn, subtitleFr } = sections.hero;

  return (
    <section
      id="hero"
      className="relative pt-[120px] pb-[80px] md:pt-[140px] md:pb-[100px]"
    >
      <div className="container max-w-[1200px] mx-auto px-4 grid gap-10 md:grid-cols-[1.2fr_minmax(0,1fr)] items-center">
        <div data-aos="fade-up" className="hero-panel space-y-6">
          <p className="uppercase tracking-[0.12em] text-xs text-[var(--text-secondary)]">
            GOSEC – Gatineau Ottawa Social Elite Club
          </p>
          <h1 className="display-large">
            {titleEn}
            <span className="block mt-2">{titleFr}</span>
          </h1>
          <p className="body-large max-w-xl">
            {subtitleEn}
            <span className="block mt-2">{subtitleFr}</span>
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

        <div
          data-aos="zoom-in"
          className="hidden md:flex justify-end"
        >
          <div className="network-card max-w-sm">
            <div className="network-card-title mb-4">
              Soccer. Community. Inclusion.
              <span className="block mt-1">
                Soccer. Communauté. Inclusion.
              </span>
            </div>
            <p className="network-card-content mb-4">
              Building healthy, connected communities across Gatineau and Ottawa
              through youth, family, and newcomer programs.
            </p>
            <ul className="body-small list-disc pl-5 space-y-1">
              <li>Youth & family soccer</li>
              <li>Newcomer integration</li>
              <li>Career and mentoring support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
