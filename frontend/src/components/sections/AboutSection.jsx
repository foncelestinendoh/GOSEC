import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const AboutSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const heading = isEn ? "About GOSEC" : "À propos de GOSEC";
  const intro = isEn
    ? "GOSEC is a non-profit community club that uses soccer, culture, and education to support youth, families, newcomers, and community members in Gatineau and Ottawa."
    : "GOSEC est un organisme à but non lucratif qui utilise le soccer, la culture et l’éducation pour soutenir les jeunes, les familles, les nouveaux arrivants et la communauté à Gatineau et Ottawa.";
  const mission = isEn
    ? "To promote inclusion, healthy living, and personal growth through sports, culture, and career integration."
    : "Promouvoir l’inclusion, le bien-être et le développement personnel par le sport, la culture et l’intégration professionnelle.";
  const vision = isEn
    ? "A strong, inclusive, and connected community across Gatineau and Ottawa."
    : "Une communauté forte, inclusive et solidaire reliant Gatineau et Ottawa.";

  return (
    <section id="about" className="pt-[96px] pb-[72px] bg-white">
      <div className="container max-w-[800px] mx-auto px-4 flex flex-col items-center gap-10">
        <div data-aos="fade-up" className="space-y-8 text-center">
          <h2 className="heading-1 text-black">{heading}</h2>
          <p className="body-large max-w-2xl mx-auto text-black/80">
            {intro}
          </p>
          <div className="space-y-6 body-medium text-black/80">
            <div>
              <h3 className="heading-3 mb-2 text-black">{isEn ? "Mission" : "Mission"}</h3>
              <p className="max-w-2xl mx-auto">{mission}</p>
            </div>
            <div>
              <h3 className="heading-3 mb-2 text-black">{isEn ? "Vision" : "Vision"}</h3>
              <p className="max-w-2xl mx-auto">{vision}</p>
            </div>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          className="network-card body-small space-y-4 p-0 overflow-hidden max-w-xl"
        >
          <div className="h-60 w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1565813086292-604790c8a97b?auto=format&fit=crop&w=900&q=80"
              alt="Community members connecting at an outdoor event"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 space-y-2">
            <p className="body-medium font-semibold text-[var(--text-primary)]">
              {isEn
                ? "Building bridges between Gatineau and Ottawa."
                : "Tisser des liens entre Gatineau et Ottawa."}
            </p>
            <p>
              {isEn
                ? "GOSEC creates safe, welcoming spaces where youth, families, and newcomers can connect, belong, and grow together."
                : "GOSEC crée des espaces sécuritaires et accueillants où les jeunes, les familles et les nouveaux arrivants peuvent se rencontrer, s’intégrer et grandir ensemble."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
