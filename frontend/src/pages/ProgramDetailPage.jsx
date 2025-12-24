import React from "react";
import { useParams, Link } from "react-router-dom";
import { sections } from "@/mock/gosecMock";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const imageMap = {
  soccer:
    "https://images.pexels.com/photos/4933853/pexels-photo-4933853.jpeg?w=1200&auto=compress&cs=tinysrgb",
  youth:
    "https://images.unsplash.com/photo-1622659097509-4d56de14539e?auto=format&fit=crop&w=1200&q=80",
  family:
    "https://images.unsplash.com/photo-1758612897496-e4db98c26ad3?auto=format&fit=crop&w=1200&q=80",
  culture:
    "https://images.unsplash.com/photo-1565813086292-604790c8a97b?auto=format&fit=crop&w=1200&q=80",
  careers:
    "https://images.pexels.com/photos/264337/pexels-photo-264337.jpeg?w=1200&auto=compress&cs=tinysrgb",
};

export const ProgramDetailPage = () => {
  const { programId } = useParams();
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
              {program.titleEn}
              <span className="block mt-1">{program.titleFr}</span>
            </h1>
            <p className="body-large">
              {program.descriptionEn}
              <span className="block mt-1">{program.descriptionFr}</span>
            </p>
            {program.bulletsEn && (
              <div className="grid md:grid-cols-2 gap-4 body-medium">
                <div>
                  <h3 className="heading-3 mb-2">What you’ll find</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {program.bulletsEn.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="body-small space-y-2">
                  <p>
                    GOSEC programs focus on confidence, leadership, teamwork, and
                    community belonging through sport and social connection.
                  </p>
                  <p>
                    Les programmes de GOSEC misent sur la confiance, le leadership,
                    l’esprit d’équipe et le sentiment d’appartenance communautaire
                    par le sport et la participation sociale.
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
