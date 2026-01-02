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

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const labels = {
    home: language === "en" ? "Home" : "Accueil",
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
        <Link to="/" className="network-logo" onClick={handleNavClick}>
          GOSEC
        </Link>
        <button
          type="button"
          className="md:hidden ml-auto text-white text-sm px-3 py-2 rounded-full border border-white/40 bg-black/20"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav className={`network-nav ${menuOpen ? "flex" : "hidden md:flex"}`}>
          <Link to="/about" className={navLinkClass("/about")} onClick={handleNavClick}>
            {labels.about}
          </Link>
          <Link to="/programs" className={navLinkClass("/programs")} onClick={handleNavClick}>
            {labels.programs}
          </Link>
          <Link to="/gallery" className={navLinkClass("/gallery")} onClick={handleNavClick}>
            {labels.gallery}
          </Link>
          <Link to="/events" className={navLinkClass("/events")} onClick={handleNavClick}>
            {labels.events}
          </Link>
          <Link to="/faqs" className={navLinkClass("/faqs")} onClick={handleNavClick}>
            {labels.faqs}
          </Link>
          <Link to="/contact" className={navLinkClass("/contact")} onClick={handleNavClick}>
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
