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
          data-aos="fade-up"
          className="w-full mt-10 space-y-4"
        >
          <h3 className="heading-3 text-black text-center">
            Leadership & Organigram / Organigramme et direction
          </h3>
          <p className="body-medium text-black/80 text-center max-w-2xl mx-auto">
            Photos and full profiles of the GOSEC leadership team will appear here.
            <span className="block mt-1 body-small text-black/70">
              Photos et profils détaillés de l’équipe de direction de GOSEC seront
              affichés ici.
            </span>
          </p>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-black/10" />
              <div className="font-semibold text-black text-sm">President</div>
              <div className="body-small text-black/70">Président(e)</div>
              <div className="body-small mt-1 text-black/60">Photo coming soon</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-black/10" />
              <div className="font-semibold text-black text-sm">Vice-President</div>
              <div className="body-small text-black/70">Vice-président(e)</div>
              <div className="body-small mt-1 text-black/60">Photo coming soon</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-black/10" />
              <div className="font-semibold text-black text-sm">Secretary General</div>
              <div className="body-small text-black/70">Secrétaire général(e)</div>
              <div className="body-small mt-1 text-black/60">Photo coming soon</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-black/10" />
              <div className="font-semibold text-black text-sm">Treasurer</div>
              <div className="body-small text-black/70">Trésorier(ère)</div>
              <div className="body-small mt-1 text-black/60">Photo coming soon</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-black/10" />
              <div className="font-semibold text-black text-sm">Financial Secretary</div>
              <div className="body-small text-black/70">Secrétaire financier(ère)</div>
              <div className="body-small mt-1 text-black/60">Photo coming soon</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-black/10" />
              <div className="font-semibold text-black text-sm">
                Public Relations Officer (PRO)
              </div>
              <div className="body-small text-black/70">Responsable des relations publiques</div>
              <div className="body-small mt-1 text-black/60">Photo coming soon</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-black/10" />
              <div className="font-semibold text-black text-sm">Head Coach / Technical Director</div>
              <div className="body-small text-black/70">Entraîneur chef / Directeur technique</div>
              <div className="body-small mt-1 text-black/60">Photo coming soon</div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-5 text-center shadow-sm">
              <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-black/10" />
              <div className="font-semibold text-black text-sm">
                Volunteers & Community Leaders
              </div>
              <div className="body-small text-black/70">Bénévoles et leaders communautaires</div>
              <div className="body-small mt-1 text-black/60">Photo coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
