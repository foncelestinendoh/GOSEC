import React from "react";
import { useParams, Link } from "react-router-dom";
import { sections } from "@/mock/gosecMock";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const imageMap = {
  soccer:
    "https://images.pexels.com/photos/13318212/pexels-photo-13318212.jpeg?w=1200&auto=compress&cs=tinysrgb",
  youth:
    "https://images.pexels.com/photos/7551739/pexels-photo-7551739.jpeg?w=1200&auto=compress&cs=tinysrgb",
  family:
    "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?w=1200&auto=compress&cs=tinysrgb",
  culture:
    "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=1200&auto=compress&cs=tinysrgb",
  careers:
    "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?w=1200&auto=compress&cs=tinysrgb",
};

export const ProgramDetailPage = () => {
  const { programId } = useParams();
  const { language } = useLanguage();
  const isEn = language === "en";
  const program = sections.programs.categories.find((c) => c.id === programId);

  if (!program) {
    return (
      <section className="py-[72px] bg-white">
        <div className="container max-w-[900px] mx-auto px-4 space-y-4">
          <h1 className="heading-1">Program not found</h1>
          <p className="body-medium">
            This GOSEC program does not exist or may have been moved.
          </p>
          <Button asChild className="btn-primary button-text mt-2">
            <Link to="/programs">Back to Programs / Retour aux programmes</Link>
          </Button>
        </div>
      </section>
    );
  }

  const imageUrl = imageMap[program.id];

  return (
    <section className="py-[72px] bg-[#F7F7F7]">
      <div className="container max-w-[1100px] mx-auto px-4 space-y-8">
        <div className="network-card p-0 overflow-hidden" data-aos="fade-up">
          {imageUrl && (
            <div className="h-72 w-full overflow-hidden">
              <img
                src={imageUrl}
                alt={program.titleEn}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="p-6 md:p-8 space-y-4">
            <h1 className="heading-1">
              {isEn ? program.titleEn : program.titleFr}
            </h1>
            <p className="body-large">
              {isEn ? program.descriptionEn : program.descriptionFr}
            </p>
            {program.bulletsEn && (
              <div className="grid md:grid-cols-2 gap-4 body-medium">
                <div>
                  <h3 className="heading-3 mb-2">
                    {isEn ? "What you'll find" : "Ce que vous trouverez"}
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {program.bulletsEn.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="body-small space-y-2">
                  <p>
                    {isEn
                      ? "GOSEC programs focus on confidence, leadership, teamwork, and community belonging through sport and social connection."
                      : "Les programmes de GOSEC misent sur la confiance, le leadership, l'esprit d'équipe et le sentiment d'appartenance communautaire par le sport et la participation sociale."}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild className="btn-primary button-text">
                <Link to="/">Join a GOSEC program / Rejoindre un programme GOSEC</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary button-text">
                <Link to="/programs">Back to Programs / Retour aux programmes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetailPage;
