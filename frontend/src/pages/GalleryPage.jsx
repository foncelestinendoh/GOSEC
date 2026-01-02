import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const galleryItems = [
  {
    id: "soccer-youth",
    titleEn: "Youth soccer energy",
    titleFr: "Énergie du soccer chez les jeunes",
    src:
      "https://images.pexels.com/photos/13318212/pexels-photo-13318212.jpeg?w=1200&auto=compress&cs=tinysrgb",
    alt: "Black youth soccer players wearing GOSEC-style jerseys in a team huddle",
  },
  {
    id: "family-day",
    titleEn: "Family day in the park",
    titleFr: "Journée familiale au parc",
    src:
      "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?w=1200&auto=compress&cs=tinysrgb",
    alt: "Black family spending time together outdoors with a ball",
  },
  {
    id: "culture-fest",
    titleEn: "Culture and music night",
    titleFr: "Soirée culture et musique",
    src:
      "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=1200&auto=compress&cs=tinysrgb",
    alt: "Black community members gathered at a cultural celebration",
  },
  {
    id: "career-fair",
    titleEn: "Career orientation & job fair",
    titleFr: "Orientation de carrière et foire d’emploi",
    src:
      "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?w=1200&auto=compress&cs=tinysrgb",
    alt: "Black students and professionals networking at a job fair",
  },
];

export const GalleryPage = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section className="py-[72px] bg-white">
      <div className="container max-w-[1100px] mx-auto px-4 space-y-8">
        <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
          <h1 className="heading-1 text-black mt-4 mb-3">
            {isEn ? "Gallery" : "Galerie"}
          </h1>
          <p className="body-large text-black/80">
            {isEn
              ? "Moments from GOSEC programs, tournaments, and community events."
              : "Moments forts des programmes, tournois et événements communautaires de GOSEC."}
          </p>
        </div>
        <div
          className="grid gap-6 md:grid-cols-2"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {galleryItems.map((item) => (
            <figure
              key={item.id}
              className="overflow-hidden rounded-3xl shadow-md bg-white flex flex-col"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-60 w-full object-cover"
              />
              <figcaption className="p-4 body-medium text-black/80">
                <div className="font-semibold text-black">
                  {isEn ? item.titleEn : item.titleFr}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
