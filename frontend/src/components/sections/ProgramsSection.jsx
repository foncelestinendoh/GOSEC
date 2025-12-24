import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sections } from "@/mock/gosecMock";

export const ProgramsSection = () => {
  const { categories } = sections.programs;

  return (
    <section id="programs" className="py-[64px] bg-white">
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
            <Card key={cat.id} className="network-card border-0">
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
