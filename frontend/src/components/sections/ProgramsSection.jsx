import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sections } from "@/mock/gosecMock";

export const ProgramsSection = () => {
  const { categories } = sections.programs;

  return (
    <section id="programs" className="py-[72px] bg-white">
      <div className="container max-w-[1200px] mx-auto px-4 space-y-10">
        <div className="max-w-2xl" data-aos="fade-up">
          <h2 className="heading-1 mb-3">Programs & Services</h2>
          <p className="body-large">
            Soccer, youth, family, cultural, and professional integration programs
            that connect Gatineau and Ottawa.
            <span className="block mt-1">
              Programmes de soccer, jeunesse, famille, intégration culturelle et
              professionnelle pour relier Gatineau et Ottawa.
            </span>
          </p>
        </div>
        <div
          className="network-grid"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {categories.map((cat) => (
            <Card key={cat.id} className="network-card border-0 p-0 overflow-hidden">
              {cat.id === "soccer" && (
                <div className="h-52 w-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/4933853/pexels-photo-4933853.jpeg?w=900&auto=compress&cs=tinysrgb"
                    alt="Children playing soccer together on a field"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              {cat.id === "family" && (
                <div className="h-52 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1758612897496-e4db98c26ad3?auto=format&fit=crop&w=900&q=80"
                    alt="Family with a soccer ball enjoying time together"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              {cat.id === "careers" && (
                <div className="h-52 w-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/264337/pexels-photo-264337.jpeg?w=900&auto=compress&cs=tinysrgb"
                    alt="Coach giving advice to a young player on the field"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="network-card-title">
                    {cat.titleEn}
                    <span className="block mt-1">{cat.titleFr}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="network-card-content mb-3">
                    {cat.descriptionEn}
                    <span className="block mt-1">{cat.descriptionFr}</span>
                  </p>
                  {cat.bulletsEn && (
                    <ul className="body-small list-disc pl-5 space-y-1 mt-2">
                      {cat.bulletsEn.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
