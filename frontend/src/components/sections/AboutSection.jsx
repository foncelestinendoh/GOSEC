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
            <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6 items-center text-left md:text-left">
              <div>
                <h3 className="heading-3 mb-2 text-black">{isEn ? "Vision" : "Vision"}</h3>
                <p className="max-w-2xl mx-auto">{vision}</p>
              </div>
              <div className="h-40 md:h-48 w-full overflow-hidden rounded-3xl shadow-md">
                <img
                  src="https://images.pexels.com/photos/9553914/pexels-photo-9553914.jpeg?w=900&auto=compress&cs=tinysrgb"
                  alt={
                    isEn
                      ? "Afro-descendant youth in a creative studio with light trails, symbolizing an innovative future vision"
                      : "Jeunes afro-descendants dans un studio créatif avec des jeux de lumière, symbolisant une vision d'avenir innovante"
                  }
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
          <div className="h-60 w-full overflow-hidden">
            <img
              src="https://images.pexels.com/photos/18414880/pexels-photo-18414880.jpeg?w=900&auto=compress&cs=tinysrgb"
              alt="Afro-descendant families and youth connecting at a community event"
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
