// Static fallback data for GitHub Pages deployment without backend
// This data will be used when REACT_APP_BACKEND_URL is not configured

export const staticLeadership = [
  {
    id: "1",
    name: "Jean-Pierre Mbeki",
    role_en: "Founder & President",
    role_fr: "Fondateur et Président",
    bio_en: "Jean-Pierre founded GOSEC with a vision to unite communities through sports and culture. With over 15 years of community leadership experience, he has dedicated his life to empowering youth and families in Gatineau-Ottawa.",
    bio_fr: "Jean-Pierre a fondé GOSEC avec la vision d'unir les communautés par le sport et la culture. Avec plus de 15 ans d'expérience en leadership communautaire, il a consacré sa vie à l'autonomisation des jeunes et des familles à Gatineau-Ottawa.",
    email: "president@gosec.ca",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    order: 1
  },
  {
    id: "2",
    name: "Aminata Diallo",
    role_en: "Vice President",
    role_fr: "Vice-Présidente",
    bio_en: "Aminata brings extensive experience in nonprofit management and community development. She oversees program development and strategic partnerships.",
    bio_fr: "Aminata apporte une vaste expérience en gestion d'organismes à but non lucratif et en développement communautaire. Elle supervise le développement des programmes et les partenariats stratégiques.",
    email: "vp@gosec.ca",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    order: 2
  },
  {
    id: "3",
    name: "Emmanuel Okonkwo",
    role_en: "Director of Soccer Programs",
    role_fr: "Directeur des programmes de soccer",
    bio_en: "Emmanuel is a former professional soccer player who now dedicates his expertise to developing youth athletes. He manages all recreational and competitive soccer programs.",
    bio_fr: "Emmanuel est un ancien joueur de soccer professionnel qui consacre maintenant son expertise au développement des jeunes athlètes. Il gère tous les programmes de soccer récréatifs et compétitifs.",
    email: "soccer@gosec.ca",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    order: 3
  },
  {
    id: "4",
    name: "Marie-Claire Beaumont",
    role_en: "Director of Youth Development",
    role_fr: "Directrice du développement des jeunes",
    bio_en: "Marie-Claire leads our youth leadership and mentorship programs. With a background in education and social work, she creates impactful programs for young people.",
    bio_fr: "Marie-Claire dirige nos programmes de leadership et de mentorat pour les jeunes. Avec une formation en éducation et en travail social, elle crée des programmes percutants pour les jeunes.",
    email: "youth@gosec.ca",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    order: 4
  },
  {
    id: "5",
    name: "David Ndongo",
    role_en: "Director of Cultural Programs",
    role_fr: "Directeur des programmes culturels",
    bio_en: "David oversees cultural integration initiatives and community events. He is passionate about celebrating diversity and helping newcomers feel welcome.",
    bio_fr: "David supervise les initiatives d'intégration culturelle et les événements communautaires. Il est passionné par la célébration de la diversité et par l'accueil des nouveaux arrivants.",
    email: "culture@gosec.ca",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    order: 5
  },
  {
    id: "6",
    name: "Fatou Sow",
    role_en: "Director of Family Programs",
    role_fr: "Directrice des programmes familiaux",
    bio_en: "Fatou coordinates family-oriented activities and wellness programs. She believes in strengthening community bonds through family engagement.",
    bio_fr: "Fatou coordonne les activités familiales et les programmes de bien-être. Elle croit au renforcement des liens communautaires par l'engagement familial.",
    email: "family@gosec.ca",
    image_url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    order: 6
  },
  {
    id: "7",
    name: "Michel Tremblay",
    role_en: "Treasurer",
    role_fr: "Trésorier",
    bio_en: "Michel manages GOSEC's finances and fundraising initiatives. His expertise in financial management ensures the organization's sustainability.",
    bio_fr: "Michel gère les finances de GOSEC et les initiatives de collecte de fonds. Son expertise en gestion financière assure la pérennité de l'organisation.",
    email: "treasurer@gosec.ca",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    order: 7
  },
  {
    id: "8",
    name: "Aisha Mohammed",
    role_en: "Secretary & Communications",
    role_fr: "Secrétaire et Communications",
    bio_en: "Aisha handles organizational communications, media relations, and community outreach. She ensures GOSEC's message reaches all corners of the community.",
    bio_fr: "Aisha gère les communications organisationnelles, les relations avec les médias et la sensibilisation communautaire. Elle s'assure que le message de GOSEC atteint tous les coins de la communauté.",
    email: "communications@gosec.ca",
    image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
    order: 8
  }
];

export const staticAboutContent = {
  about_en: "GOSEC is a non-profit community club that uses soccer, culture, and education to support youth, families, newcomers, and community members in Gatineau and Ottawa.",
  about_fr: "GOSEC est un organisme à but non lucratif qui utilise le soccer, la culture et l'éducation pour soutenir les jeunes, les familles, les nouveaux arrivants et la communauté à Gatineau et Ottawa.",
  mission_en: "To promote inclusion, healthy living, and personal growth through sports, culture, and career integration.",
  mission_fr: "Promouvoir l'inclusion, le bien-être et le développement personnel par le sport, la culture et l'intégration professionnelle.",
  vision_en: "A strong, inclusive, and connected community across Gatineau and Ottawa.",
  vision_fr: "Une communauté forte, inclusive et solidaire reliant Gatineau et Ottawa."
};

export const staticPrograms = [
  {
    id: "youth",
    title_en: "Youth Development",
    title_fr: "Développement des jeunes",
    description_en: "Programs designed to help young people develop leadership skills, build confidence, and achieve their potential through sports and mentorship.",
    description_fr: "Programmes conçus pour aider les jeunes à développer des compétences en leadership, à renforcer leur confiance et à atteindre leur potentiel grâce au sport et au mentorat.",
    bullets_en: ["Leadership training", "Academic support", "Sports activities", "Community service"],
    bullets_fr: ["Formation au leadership", "Soutien scolaire", "Activités sportives", "Service communautaire"],
    order: 1
  },
  {
    id: "family",
    title_en: "Family Programs",
    title_fr: "Programmes familiaux",
    description_en: "Engaging activities that bring families together, strengthen bonds, and create lasting memories while promoting health and wellness.",
    description_fr: "Activités engageantes qui rassemblent les familles, renforcent les liens et créent des souvenirs durables tout en promouvant la santé et le bien-être.",
    bullets_en: ["Family fitness classes", "Parent-child activities", "Community events", "Workshops"],
    bullets_fr: ["Cours de fitness en famille", "Activités parent-enfant", "Événements communautaires", "Ateliers"],
    order: 2
  },
  {
    id: "culture",
    title_en: "Cultural Integration",
    title_fr: "Intégration culturelle",
    description_en: "Celebrating diversity through cultural events, language support, and community gatherings that help newcomers feel welcome.",
    description_fr: "Célébrer la diversité à travers des événements culturels, un soutien linguistique et des rassemblements communautaires qui aident les nouveaux arrivants à se sentir bienvenus.",
    bullets_en: ["Cultural celebrations", "Language support", "Newcomer orientation", "Community connections"],
    bullets_fr: ["Célébrations culturelles", "Soutien linguistique", "Orientation des nouveaux arrivants", "Connexions communautaires"],
    order: 3
  },
  {
    id: "careers",
    title_en: "Career Development",
    title_fr: "Développement de carrière",
    description_en: "Professional development programs including job readiness training, resume workshops, and networking opportunities.",
    description_fr: "Programmes de développement professionnel incluant la formation à l'emploi, des ateliers de CV et des opportunités de réseautage.",
    bullets_en: ["Job readiness training", "Resume workshops", "Interview preparation", "Networking events"],
    bullets_fr: ["Formation à l'emploi", "Ateliers de CV", "Préparation aux entretiens", "Événements de réseautage"],
    order: 4
  },
  {
    id: "soccer",
    title_en: "Recreational Soccer",
    title_fr: "Soccer récréatif",
    description_en: "Community-based soccer programs for all ages and skill levels, promoting fitness, teamwork, and fun in a welcoming environment.",
    description_fr: "Programmes de soccer communautaires pour tous les âges et niveaux de compétence, promouvant la forme physique, le travail d'équipe et le plaisir dans un environnement accueillant.",
    bullets_en: ["Youth leagues", "Adult leagues", "Skills clinics", "Tournament play"],
    bullets_fr: ["Ligues jeunesse", "Ligues adultes", "Cliniques de compétences", "Tournois"],
    order: 5
  }
];

export const staticEvents = [
  {
    id: "1",
    date_en: "August 15, 2025",
    date_fr: "15 août 2025",
    title_en: "Summer Soccer Tournament",
    title_fr: "Tournoi de soccer d'été",
    location_en: "Gatineau Sports Complex",
    location_fr: "Complexe sportif de Gatineau",
    summary_en: "Join us for our annual summer soccer tournament featuring teams from across the region. All skill levels welcome!",
    summary_fr: "Rejoignez-nous pour notre tournoi de soccer d'été annuel mettant en vedette des équipes de toute la région.",
    image_url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
    order: 1
  },
  {
    id: "2",
    date_en: "September 5, 2025",
    date_fr: "5 septembre 2025",
    title_en: "Back to School Family BBQ",
    title_fr: "BBQ familial de rentrée scolaire",
    location_en: "GOSEC Community Center",
    location_fr: "Centre communautaire GOSEC",
    summary_en: "Celebrate the new school year with food, games, and community connections. Bring the whole family!",
    summary_fr: "Célébrez la nouvelle année scolaire avec de la nourriture, des jeux et des connexions communautaires.",
    image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    order: 2
  },
  {
    id: "3",
    date_en: "October 12, 2025",
    date_fr: "12 octobre 2025",
    title_en: "Cultural Heritage Festival",
    title_fr: "Festival du patrimoine culturel",
    location_en: "Ottawa Convention Centre",
    location_fr: "Centre des congrès d'Ottawa",
    summary_en: "A celebration of diverse cultures through music, dance, food, and art from communities across Gatineau and Ottawa.",
    summary_fr: "Une célébration de diverses cultures à travers la musique, la danse, la nourriture et l'art.",
    image_url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    order: 3
  },
  {
    id: "4",
    date_en: "November 20, 2025",
    date_fr: "20 novembre 2025",
    title_en: "Youth Leadership Conference",
    title_fr: "Conférence sur le leadership des jeunes",
    location_en: "University of Ottawa",
    location_fr: "Université d'Ottawa",
    summary_en: "Empowering the next generation of leaders through workshops, speakers, and networking opportunities.",
    summary_fr: "Autonomiser la prochaine génération de leaders grâce à des ateliers et des conférenciers.",
    image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    order: 4
  }
];

export const staticGallery = [
  {
    id: "1",
    title_en: "Community Soccer Day",
    title_fr: "Journée de soccer communautaire",
    image_url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    order: 1
  },
  {
    id: "2",
    title_en: "Youth Leadership Workshop",
    title_fr: "Atelier de leadership pour les jeunes",
    image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    order: 2
  },
  {
    id: "3",
    title_en: "Family Fun Day",
    title_fr: "Journée amusante en famille",
    image_url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
    order: 3
  },
  {
    id: "4",
    title_en: "Cultural Celebration",
    title_fr: "Célébration culturelle",
    image_url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    order: 4
  },
  {
    id: "5",
    title_en: "Summer Tournament",
    title_fr: "Tournoi d'été",
    image_url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
    order: 5
  },
  {
    id: "6",
    title_en: "Community BBQ",
    title_fr: "BBQ communautaire",
    image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    order: 6
  }
];
