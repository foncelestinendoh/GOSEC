import React from "react";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[#F7F7F7] mt-12">
      <div className="container max-w-[1200px] mx-auto px-4 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 body-small text-[var(--text-light)]">
        <div>
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
        <div className="text-xs text-right">
          <div>© GOSEC – Tous droits réservés</div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
