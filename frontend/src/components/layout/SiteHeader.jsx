import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const SiteHeader = ({ onJoinClick, onMemberClick, onContactClick }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `network-nav-link ${isActive(path) ? "font-semibold" : ""}`;

  return (
    <header className="network-header">
      <div className="nav-wrapper">
        <Link to="/" className="network-logo">
          GOSEC
        </Link>
        <nav className="network-nav">
          <Link to="/about" className={navLinkClass("/about")}>
            About / À propos
          </Link>
          <Link to="/programs" className={navLinkClass("/programs")}>
            Programs / Programmes
          </Link>
          <Link to="/faqs" className={navLinkClass("/faqs")}>
            FAQs
          </Link>
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button className="btn-small btn-primary" onClick={onJoinClick}>
            Join / Rejoindre
          </Button>
          <Button
            variant="outline"
            className="btn-small btn-secondary"
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
