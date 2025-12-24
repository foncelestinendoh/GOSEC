import React from "react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-[64px] bg-white">
      <div className="container max-w-[1200px] mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
        <div data-aos="fade-up" className="space-y-5">
          <h2 className="heading-1">About GOSEC / À propos de GOSEC</h2>
          <p className="body-large">
            GOSEC is a non-profit community club that uses soccer, culture, and
            education to support youth, families, newcomers, and community
            members in Gatineau and Ottawa.
            <span className="block mt-1">
              GOSEC est un organisme à but non lucratif qui utilise le soccer, la
              culture et l’éducation pour soutenir les jeunes, les familles, les
              nouveaux arrivants et la communauté à Gatineau et Ottawa.
            </span>
          </p>
          <div className="grid md:grid-cols-2 gap-6 body-medium">
            <div>
              <h3 className="heading-3 mb-2">Mission / Mission</h3>
              <p>
                To promote inclusion, healthy living, and personal growth through
                sports, culture, and career integration.
              </p>
              <p className="mt-2 body-small">
                Promouvoir l’inclusion, le bien-être et le développement personnel
                par le sport, la culture et l’intégration professionnelle.
              </p>
            </div>
            <div>
              <h3 className="heading-3 mb-2">Vision / Vision</h3>
              <p>
                A strong, inclusive, and connected community across Gatineau and
                Ottawa.
              </p>
              <p className="mt-2 body-small">
                Une communauté forte, inclusive et solidaire reliant Gatineau et
                Ottawa.
              </p>
            </div>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          className="network-card body-small space-y-3"
        >
          <p>
            GOSEC connects families, youth, and newcomers through sport,
            mentorship, and community action.
          </p>
          <p>
            GOSEC relie les familles, les jeunes et les nouveaux arrivants par le
            sport, le mentorat et l’action communautaire.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
