import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const events = [
  {
    id: "indoor-soccer",
    dateEn: "February 8, 2026",
    dateFr: "8 février 2026",
    titleEn: "Indoor Soccer Winter League Kickoff",
    titleFr: "Lancement de la ligue hivernale de soccer intérieur",
    locationEn: "Indoor Sports Centre – Gatineau",
    locationFr: "Centre sportif intérieur – Gatineau",
    image:
      "https://images.pexels.com/photos/13318212/pexels-photo-13318212.jpeg?w=1200&auto=compress&cs=tinysrgb",
    summaryEn:
      "Fast-paced 5v5 indoor matches for youth (U10–U18) with certified coaches, music, and safe winter training.",
    summaryFr:
      "Matchs intenses de soccer intérieur 5 contre 5 pour les jeunes (U10–U18) avec entraîneurs certifiés, musique et entraînement hivernal sécuritaire.",
  },
  {
    id: "community-bbq",
    dateEn: "June 15, 2026",
    dateFr: "15 juin 2026",
    titleEn: "Community BBQ & Family Fun Day",
    titleFr: "BBQ communautaire et journée familiale",
    locationEn: "Parc du Lac Leamy – Gatineau",
    locationFr: "Parc du Lac Leamy – Gatineau",
    image:
      "https://images.pexels.com/photos/4255480/pexels-photo-4255480.jpeg?w=1200&auto=compress&cs=tinysrgb",
    summaryEn:
      "A full day of food, music, youth games, mini-soccer, and intergenerational activities for families and newcomers.",
    summaryFr:
      "Une journée complète de nourriture, de musique, de jeux pour les jeunes, de mini-soccer et d’activités intergénérationnelles pour les familles et les nouveaux arrivants.",
  },
  {
    id: "general-assembly",
    dateEn: "March 22, 2026",
    dateFr: "22 mars 2026",
    titleEn: "GOSEC General Assembly Meeting",
    titleFr: "Assemblée générale de GOSEC",
    locationEn: "Maison de la culture – Gatineau",
    locationFr: "Maison de la culture – Gatineau",
    image:
      "https://images.pexels.com/photos/1181398/pexels-photo-1181398.jpeg?w=1200&auto=compress&cs=tinysrgb",
    summaryEn:
      "Presentation of annual results, future projects, elections for committee roles, and open feedback from members.",
    summaryFr:
      "Présentation des résultats annuels, des projets à venir, élections pour les rôles de comité et période de questions/commentaires des membres.",
  },
  {
    id: "career-fair",
    dateEn: "May 10, 2026",
    dateFr: "10 mai 2026",
    titleEn: "Youth Career Orientation & Job Fair",
    titleFr: "Orientation de carrière et foire d’emploi pour les jeunes",
    locationEn: "Community Centre – Ottawa",
    locationFr: "Centre communautaire – Ottawa",
    image:
      "https://images.pexels.com/photos/6146961/pexels-photo-6146961.jpeg?w=1200&auto=compress&cs=tinysrgb",
    summaryEn:
      "Workshops on CV writing, interview skills, networking with local employers, and mentorship for youth and newcomers.",
    summaryFr:
      "Ateliers sur la rédaction de CV, les techniques d’entrevue, le réseautage avec des employeurs locaux et le mentorat pour les jeunes et les nouveaux arrivants.",
  },
  {
    id: "canada-veteran-tournament",
    dateEn: "July 19–21, 2026",
    dateFr: "19–21 juillet 2026",
    titleEn: "Canada National Veteran Tournament – Edmonton",
    titleFr: "Tournoi national canadien des vétérans – Edmonton",
    locationEn: "Edmonton, Alberta",
    locationFr: "Edmonton, Alberta",
    image:
      "https://images.pexels.com/photos/1761090/pexels-photo-1761090.jpeg?w=1200&auto=compress&cs=tinysrgb",
    summaryEn:
      "GOSEC veteran players travel to Edmonton to represent the Gatineau–Ottawa region in a national tournament bringing together teams from across Canada.",
    summaryFr:
      "Les joueurs vétérans de GOSEC se rendent à Edmonton pour représenter la région de Gatineau–Ottawa dans un tournoi national réunissant des équipes de tout le Canada.",
  },
];

export const EventsPage = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section className="py-[72px] bg-[#F7F7F7]">
      <div className="container max-w-[1100px] mx-auto px-4 space-y-8">
        <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
          <h1 className="heading-1 text-black mb-3">
            {isEn ? "Upcoming Events" : "Événements à venir"}
          </h1>
          <p className="body-large text-black/80">
            {isEn
              ? "Discover the key GOSEC events planned for next year across soccer, community life, and career development."
              : "Découvrez les principaux événements GOSEC prévus pour l’année prochaine autour du soccer, de la vie communautaire et du développement de carrière."}
          </p>
        </div>
        <div className="space-y-6" data-aos="fade-up" data-aos-delay="150">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-3xl bg-white shadow-md overflow-hidden flex flex-col md:flex-row gap-0"
            >
              <div className="md:w-2/5 h-56 md:h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={isEn ? event.titleEn : event.titleFr}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-semibold tracking-[0.15em] uppercase text-black/60">
                    {isEn ? event.dateEn : event.dateFr}
                  </div>
                  <h2 className="heading-3 text-black">
                    {isEn ? event.titleEn : event.titleFr}
                  </h2>
                  <p className="body-small text-black/70">
                    <span className="font-semibold">
                      {isEn ? event.locationEn : event.locationFr}
                    </span>
                  </p>
                  <p className="body-medium text-black/80 mt-2">
                    {isEn ? event.summaryEn : event.summaryFr}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
