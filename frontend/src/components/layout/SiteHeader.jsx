import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const SiteHeader = ({ onJoinClick, onMemberClick, onContactClick }) => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `network-nav-link ${isActive(path) ? "font-semibold" : ""}`;

  const labels = {
    about: language === "en" ? "About" : "À propos",
    programs: language === "en" ? "Programs" : "Programmes",
    gallery: language === "en" ? "Gallery" : "Galerie",
    events: language === "en" ? "Upcoming Events" : "Événements à venir",
    faqs: language === "en" ? "FAQs" : "FAQ",
    contact: language === "en" ? "Contact" : "Contact",
    join: language === "en" ? "Join" : "Rejoindre",
    member: language === "en" ? "Donate" : "Donner",
  };

  return (
    <header className="network-header">
      <div className="nav-wrapper">
        <Link to="/" className="network-logo">
          GOSEC
        </Link>
        <nav className="network-nav">
          <Link to="/about" className={navLinkClass("/about")}>
            {labels.about}
          </Link>
          <Link to="/programs" className={navLinkClass("/programs")}>
            {labels.programs}
          </Link>
          <Link to="/gallery" className={navLinkClass("/gallery")}>
            {labels.gallery}
          </Link>
          <Link to="/events" className={navLinkClass("/events")}>
            {labels.events}
          </Link>
          <Link to="/faqs" className={navLinkClass("/faqs")}>
            {labels.faqs}
          </Link>
          <Link to="/contact" className={navLinkClass("/contact")}>
            {labels.contact}
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center rounded-full border border-[var(--border-light)] bg-white px-1 py-1 text-xs">
            <button
              type="button"
              className={`px-2 py-1 rounded-full ${
                language === "en" ? "bg-[var(--brand-dark)] text-white" : "text-[var(--text-primary)]"
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded-full ${
                language === "fr" ? "bg-[var(--brand-dark)] text-white" : "text-[var(--text-primary)]"
              }`}
              onClick={() => setLanguage("fr")}
            >
              FR
            </button>
          </div>
          <Button
            className="btn-small btn-primary bg-[#e53935] hover:bg-[#c62828] text-white"
            onClick={onJoinClick}
          >
            {labels.join}
          </Button>
          <Button
            variant="outline"
            className="btn-small btn-secondary border border-[#1565c0] text-[#1565c0] hover:bg-[#1565c0] hover:text-white"
            onClick={onMemberClick}
          >
            {labels.member}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
