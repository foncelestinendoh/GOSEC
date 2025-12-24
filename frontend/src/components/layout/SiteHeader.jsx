import React, { useEffect } from "react";
import SmoothScroll from "smooth-scroll";
import { Button } from "@/components/ui/button";

let scrollInstance;

export const SiteHeader = ({ onJoinClick, onMemberClick, onContactClick, onNavigate }) => {
  useEffect(() => {
    if (!scrollInstance) {
      scrollInstance = new SmoothScroll('a[href*="#"]', {
        speed: 800,
        speedAsDuration: true,
      });
    }
  }, []);

  const handleNavClick = (id, evt) => {
    evt.preventDefault();
    onNavigate?.(id);
  };

  return (
    <header className="network-header">
      <div className="nav-wrapper">
        <a href="#hero" className="network-logo" onClick={(e) => handleNavClick("hero", e)}>
          GOSEC
        </a>
        <nav className="network-nav">
          <a href="#about" className="network-nav-link" onClick={(e) => handleNavClick("about", e)}>
            About / À propos
          </a>
          <a href="#programs" className="network-nav-link" onClick={(e) => handleNavClick("programs", e)}>
            Programs / Programmes
          </a>
          <a href="#faqs" className="network-nav-link" onClick={(e) => handleNavClick("faqs", e)}>
            FAQs
          </a>
          <a href="#contact" className="network-nav-link" onClick={(e) => handleNavClick("contact", e)}>
            Contact
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button className="btn-small btn-primary" onClick={onJoinClick}>
            Join / Rejoindre
          </Button>
          <Button
            variant="outline"
            className="btn-small btn-secondary bg-transparent border border-[var(--brand-primary)] text-white"
            onClick={onMemberClick}
          >
            Member / Membre
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
