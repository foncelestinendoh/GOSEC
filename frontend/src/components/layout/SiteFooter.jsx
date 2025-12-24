import React from "react";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[#F7F7F7] mt-16">
      <div className="container max-w-[1200px] mx-auto px-4 py-12 flex flex-col lg:flex-row items-start lg:items-start justify-between gap-10 body-small text-[var(--text-light)]">
        <div className="space-y-3 max-w-md">
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
        <div className="flex flex-col md:flex-row gap-6 text-xs md:text-right max-w-xl md:justify-end">
          <div className="space-y-1 md:text-left">
            <div className="font-semibold text-[var(--text-primary)] mb-1">
              Address / Adresse
            </div>
            <p>
              GOSEC – Gatineau Ottawa Social Elite Club
              <br />
              Community Fields & Recreation Hub (example)
              <br />
              Gatineau–Ottawa, QC
            </p>
          </div>
          <div className="space-y-1 md:text-left">
            <div className="font-semibold text-[var(--text-primary)] mb-1">
              Opening hours / Heures d’ouverture
            </div>
            <p>
              Mon–Fri / Lun–Ven: 17:00 – 21:00
              <br />
              Sat–Sun / Sam–Dim: Events & tournaments
            </p>
          </div>
          <div className="space-y-1 md:text-left">
            <div className="font-semibold text-[var(--text-primary)] mb-1">
              Location
            </div>
            <p>
              View on Google Maps / Voir sur Google Maps:
              <br />
              <a
                href="https://www.google.com/maps/place/Gatineau,+QC,+Canada"
                target="_blank"
                rel="noreferrer"
                className="link-text"
              >
                Gatineau–Ottawa Community Fields (example)
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border-light)] bg-[#EFEFEF] mt-4">
        <div className="container max-w-[1200px] mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] text-[var(--text-light)]">
          <span>Based in Gatineau and Ottawa / Basé à Gatineau et Ottawa</span>
          <span>© GOSEC – Tous droits réservés</span>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
