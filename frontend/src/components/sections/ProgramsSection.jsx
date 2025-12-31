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
                        {isEn ? cat.titleEn : cat.titleFr}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="body-medium">
                        {isEn ? cat.descriptionEn : cat.descriptionFr}
                      </p>
                    </CardContent>
                  </div>
                  <div className="flex justify-center md:justify-end flex-shrink-0">
                    {cat.id === "soccer" && (
                      <img
                        src="https://images.pexels.com/photos/13318212/pexels-photo-13318212.jpeg?w=900&auto=compress&cs=tinysrgb"
                        alt="Black youth soccer players wearing GOSEC-style jerseys in a team huddle"
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
                        src="https://images.pexels.com/photos/7551739/pexels-photo-7551739.jpeg?w=900&auto=compress&cs=tinysrgb"
                        alt="Black youth celebrating together on a sports field"
                        className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 object-cover rounded-2xl"
                      />
                    )}
                    {cat.id === "culture" && (
                      <img
                        src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=900&auto=compress&cs=tinysrgb"
                        alt="Black community members gathered at a cultural celebration"
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
