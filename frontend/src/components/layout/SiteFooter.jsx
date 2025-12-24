import React from "react";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[#F7F7F7] mt-16">
      <div className="container max-w-[1200px] mx-auto px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 body-small text-[var(--text-light)]">
        <div className="space-y-2 max-w-md">
          <div className="font-semibold text-[var(--text-primary)] mb-1">
            GOSEC – Gatineau Ottawa Social Elite Club
          </div>
          <div>
            Building healthy, inclusive, and connected communities.
            <span className="block">
              Construire des communautés inclusives et en santé.
            </span>
          </div>
        </div>
        <div className="space-y-1 text-xs md:text-right">
          <div>Based in Gatineau and Ottawa / Basé à Gatineau et Ottawa</div>
          <div>Community Fields & Recreation Hub (example)</div>
          <div>© GOSEC – Tous droits réservés</div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
