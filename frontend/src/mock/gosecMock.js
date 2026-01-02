// Frontend-only mock data and helpers for GOSEC landing page

export const sections = {
  hero: {
    titleEn: "Gatineau Ottawa Social Elite Club",
    titleFr: "Club Social d’Élite Gatineau Ottawa",
    subtitleEn:
      "Community-based soccer and social programs for youth, families, and newcomers across Gatineau and Ottawa.",
    subtitleFr:
      "Programmes de soccer et d’engagement communautaire pour les jeunes, les familles et les nouveaux arrivants à Gatineau et Ottawa.",
  },
  stats: [
    { id: 1, labelEn: "Youth engaged", labelFr: "Jeunes impliqués", value: "250+" },
    { id: 2, labelEn: "Programs", labelFr: "Programmes", value: "12" },
    { id: 3, labelEn: "Volunteers", labelFr: "Bénévoles", value: "40+" },
  ],
  programs: {
    categories: [
      {
        id: "soccer",
        titleEn: "Recreational Soccer Programs",
        titleFr: "Programmes de soccer récréatif",
        descriptionEn:
          "Fun, accessible soccer for all levels with a focus on participation, teamwork, and enjoyment.",
        descriptionFr:
          "Soccer récréatif et accessible pour tous les niveaux, axé sur la participation, le travail d’équipe et le plaisir.",
        bulletsEn: [
          "Mixed-age recreational leagues (youth and adults)",
          "Family-friendly and community pickup sessions",
          "No tryouts required – all skill levels welcome",
        ],
        bulletsFr: [
          "Ligues récréatives mixtes (jeunes et adultes)",
          "Séances amicales pour familles et communauté",
          "Aucune sélection requise – tous les niveaux sont les bienvenus",
        ],
      },
      {
        id: "youth",
        titleEn: "Youth-Focused Programs",
        titleFr: "Programmes pour les jeunes",
        descriptionEn:
          "Structured programs that promote confidence, leadership, and academic motivation through sport.",
        descriptionFr:
          "Programmes structurés qui favorisent la confiance, le leadership et la motivation scolaire par le sport.",
      },
      {
        id: "family",
        titleEn: "Family-Focused Programs",
        titleFr: "Programmes pour les familles",
        descriptionEn:
          "Parent–child activities, family tournaments, and workshops on healthy living and youth development.",
        descriptionFr:
          "Activités parent–enfant, tournois familiaux et ateliers sur le bien-être et le développement des jeunes.",
      },
      {
        id: "culture",
        titleEn: "Cultural Integration",
        titleFr: "Intégration culturelle",
        descriptionEn:
          "Intercultural exchange, cultural celebrations, and community participation initiatives.",
        descriptionFr:
          "Échanges interculturels, célébrations culturelles et initiatives de participation communautaire.",
      },
      {
        id: "careers",
        titleEn: "Career & Professional Integration",
        titleFr: "Intégration professionnelle",
        descriptionEn:
          "Career guidance, mentorship, and employment readiness support.",
        descriptionFr:
          "Orientation professionnelle, mentorat et préparation à l’emploi.",
      },
    ],
  },
  faqs: [
    {
      id: "who",
      questionEn: "Who can join GOSEC programs?",
      questionFr: "Qui peut participer aux programmes de GOSEC ?",
      answerEn:
        "We welcome youth, families, and newcomers from Gatineau and Ottawa, regardless of background or skill level.",
      answerFr:
        "Nous accueillons les jeunes, les familles et les nouveaux arrivants de Gatineau et Ottawa, peu importe l’origine ou le niveau de jeu.",
    },
    {
      id: "cost",
      questionEn: "Are the programs free?",
      questionFr: "Les programmes sont-ils gratuits ?",
      answerEn:
        "Some programs are free or low-cost, and we work to reduce financial barriers for families.",
      answerFr:
        "Certains programmes sont gratuits ou à faible coût, et nous travaillons à réduire les barrières financières pour les familles.",
    },
    {
      id: "location",
      questionEn: "Where are activities held?",
      questionFr: "Où ont lieu les activités ?",
      answerEn:
        "Activities take place across community fields, gyms, and partner spaces in Gatineau and Ottawa.",
      answerFr:
        "Les activités se déroulent sur des terrains, dans des gymnases et des espaces communautaires à Gatineau et Ottawa.",
    },
  ],
}

// Simple in-memory mock for form submissions
export const initialFormState = {
  joinProgram: [],
  becomeMember: [],
  contact: [],
}
