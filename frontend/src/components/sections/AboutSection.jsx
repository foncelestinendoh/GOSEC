import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { leadershipApi, contentApi, isBackendConfigured } from "@/services/api";
import { staticLeadership, staticAboutContent } from "@/data/staticData";
import { Loader2, Mail, Linkedin } from "lucide-react";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

export const AboutSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [leadership, setLeadership] = useState([]);
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Check if backend is configured
      if (!isBackendConfigured()) {
        // Use static fallback data for GitHub Pages
        setLeadership(staticLeadership);
        setAboutContent(staticAboutContent);
        setLoading(false);
        return;
      }

      try {
        const [leadershipRes, aboutRes] = await Promise.all([
          leadershipApi.getAll(),
          contentApi.getAbout()
        ]);
        setLeadership(leadershipRes.data);
        setAboutContent(aboutRes.data);
      } catch (err) {
        console.error('Error fetching about data, using static fallback:', err);
        // Fall back to static data on error
        setLeadership(staticLeadership);
        setAboutContent(staticAboutContent);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/api/') && API_BASE_URL) {
      return `${API_BASE_URL}${url}`;
    }
    return url;
  };

  // Default content if API fails
  const heading = isEn ? "About GOSEC" : "À propos de GOSEC";
  const intro = aboutContent 
    ? (isEn ? aboutContent.about_en : aboutContent.about_fr)
    : (isEn
      ? "GOSEC is a non-profit community club that uses soccer, culture, and education to support youth, families, newcomers, and community members in Gatineau and Ottawa."
      : "GOSEC est un organisme à but non lucratif qui utilise le soccer, la culture et l'éducation pour soutenir les jeunes, les familles, les nouveaux arrivants et la communauté à Gatineau et Ottawa.");
  
  const mission = aboutContent
    ? (isEn ? aboutContent.mission_en : aboutContent.mission_fr)
    : (isEn
      ? "To promote inclusion, healthy living, and personal growth through sports, culture, and career integration."
      : "Promouvoir l'inclusion, le bien-être et le développement personnel par le sport, la culture et l'intégration professionnelle.");
  
  const vision = aboutContent
    ? (isEn ? aboutContent.vision_en : aboutContent.vision_fr)
    : (isEn
      ? "A strong, inclusive, and connected community across Gatineau and Ottawa."
      : "Une communauté forte, inclusive et solidaire reliant Gatineau et Ottawa.");

  return (
    <section id="about" className="pt-[96px] pb-[72px] bg-white">
      <div className="container max-w-[1000px] mx-auto px-4 flex flex-col items-center gap-10">
        {/* About Content */}
        <div data-aos="fade-up" className="space-y-8 text-center">
          <h2 className="heading-1 text-[var(--brand-navy)]">{heading}</h2>
          <p className="body-large max-w-2xl mx-auto text-gray-700">
            {intro}
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-[var(--bg-subtle)] rounded-2xl p-6 text-left">
              <h3 className="heading-3 mb-3 text-[var(--brand-navy)]">
                {isEn ? "Our Mission" : "Notre Mission"}
              </h3>
              <p className="body-medium text-gray-700">{mission}</p>
            </div>
            <div className="bg-[var(--bg-subtle)] rounded-2xl p-6 text-left">
              <h3 className="heading-3 mb-3 text-[var(--brand-navy)]">
                {isEn ? "Our Vision" : "Notre Vision"}
              </h3>
              <p className="body-medium text-gray-700">{vision}</p>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div data-aos="fade-up" className="w-full mt-12">
          <h3 className="heading-2 text-[var(--brand-navy)] text-center mb-2">
            {isEn ? "Leadership Team" : "Équipe de direction"}
          </h3>
          <p className="body-medium text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            {isEn 
              ? "Meet the dedicated team leading GOSEC's mission to build stronger communities."
              : "Rencontrez l'équipe dévouée qui dirige la mission de GOSEC pour bâtir des communautés plus fortes."}
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-[var(--brand-navy)]" size={32} />
            </div>
          ) : leadership.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {leadership.map((member) => (
                <div 
                  key={member.id} 
                  className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Photo */}
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    {member.image_url ? (
                      <img 
                        src={getImageUrl(member.image_url)} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-oxblood)]">
                        <span className="text-4xl font-bold text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h4 className="font-semibold text-[var(--brand-navy)] text-lg">
                      {member.name}
                    </h4>
                    <p className="text-[var(--brand-oxblood)] font-medium text-sm">
                      {isEn ? member.role_en : member.role_fr}
                    </p>
                    
                    {/* Bio - shown on hover or always visible on mobile */}
                    {(member.bio_en || member.bio_fr) && (
                      <p className="text-gray-600 text-xs mt-2 line-clamp-3">
                        {isEn ? member.bio_en : member.bio_fr}
                      </p>
                    )}
                    
                    {/* Contact Links */}
                    <div className="flex gap-2 mt-3">
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="text-gray-400 hover:text-[var(--brand-oxblood)] transition-colors"
                          title={member.email}
                        >
                          <Mail size={16} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-400 hover:text-[var(--brand-navy)] transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {isEn ? "Leadership team information coming soon." : "Informations sur l'équipe de direction à venir."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
