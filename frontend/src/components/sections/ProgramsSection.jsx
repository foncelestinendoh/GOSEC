import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sections } from "@/mock/gosecMock";
import { useLanguage } from "@/contexts/LanguageContext";

export const ProgramsSection = () => {
  const { categories } = sections.programs;
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section id="programs" className="py-[72px] bg-[#F7F7F7]">
      <div className="container max-w-[1100px] mx-auto px-4 space-y-10">
        <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
          <h2 className="heading-1 mt-6 mb-3 text-black">
            {isEn ? "Programs & Services" : "Programmes et services"}
          </h2>
          <p className="body-large text-black/80">
            {isEn
              ? "Explore GOSEC programs focused on youth, families, cultural integration, and professional growth."
              : "Découvrez les programmes de GOSEC pour les jeunes, les familles, l’intégration culturelle et le développement professionnel."}
          </p>
        </div>
        <div
          className="network-grid"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {categories.map((cat) => (
            <Card
              key={cat.id}
              className="network-card border-0 p-0 overflow-hidden hover-lift"
            >
              <Link to={`/programs/${cat.id}`} className="block h-full">
                <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                  <div className="flex-1 text-left">
                    <CardHeader className="p-0 mb-3">
                      <CardTitle className="network-card-title">
                        {cat.titleEn}
                        <span className="block mt-1">{cat.titleFr}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="body-medium">
                        {cat.descriptionEn}
                        <span className="block mt-1 body-small">
                          {cat.descriptionFr}
                        </span>
                      </p>
                    </CardContent>
                  </div>
                  <div className="flex justify-center md:justify-end flex-shrink-0">
                    {cat.id === "soccer" && (
                      <img
                        src="https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?w=900&auto=compress&cs=tinysrgb"
                        alt="Black children playing soccer together on a field"
                        className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-cover rounded-2xl"
                      />
                    )}
                    {cat.id === "family" && (
                      <img
                        src="https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?w=900&auto=compress&cs=tinysrgb"
                        alt="Black family spending time together outdoors with a ball"
                        className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-cover rounded-2xl"
                      />
                    )}
                    {cat.id === "careers" && (
                      <img
                        src="https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg?w=900&auto=compress&cs=tinysrgb"
                        alt="Students at a job fair talking with recruiters"
                        className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-cover rounded-2xl"
                      />
                    )}
                    {cat.id === "youth" && (
                      <img
                        src="https://images.unsplash.com/photo-1622659097509-4d56de14539e?auto=format&fit=crop&w=900&q=80"
                        alt="Youth soccer players celebrating together"
                        className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-cover rounded-2xl"
                      />
                    )}
                    {cat.id === "culture" && (
                      <img
                        src="https://images.unsplash.com/photo-1565813086292-604790c8a97b?auto=format&fit=crop&w=900&q=80"
                        alt="Community members gathered at a cultural event"
                        className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-cover rounded-2xl"
                      />
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
