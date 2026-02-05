import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const SiteFooter = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--brand-navy)] mt-16">
      <div className="container max-w-[1200px] mx-auto px-4 py-12 flex flex-col lg:flex-row items-start lg:items-start justify-between gap-10 body-small text-gray-300">
        <div className="space-y-3 max-w-md">
          <div className="font-semibold text-white mb-1">
            GOSEC – Gatineau Ottawa Social Elite Club
          </div>
          <div className="text-gray-300">
            {isEn
              ? "Building healthy, inclusive, and connected communities."
              : "Construire des communautés inclusives et en santé."}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 text-xs md:text-right max-w-xl md:justify-end">
          <div className="space-y-1 md:text-left">
            <div className="font-semibold text-[var(--text-primary)] mb-1">
              {isEn ? "Follow us" : "Suivez-nous"}
            </div>
            <div className="flex flex-col gap-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 text-black/80"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white">
                  <span className="text-sm font-bold" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI"' }}>
                    f
                  </span>
                </span>
                <span>Facebook</span>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="inline-flex items-center gap-2 text-black/80"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white border border-[#25F4EE]">
                  <span className="text-xs font-semibold" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI"' }}>
                    t
                  </span>
                </span>
                <span>TikTok</span>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 text-black/80"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]">
                  <span className="text-xs font-semibold" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI"' }}>
                    ig
                  </span>
                </span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
          <div className="space-y-1 md:text-left">
            <div className="font-semibold text-[var(--text-primary)] mb-1">
              {isEn ? "Address" : "Adresse"}
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
              {isEn ? "Opening hours" : "Heures d’ouverture"}
            </div>
            <p>
              {isEn
                ? "Mon–Fri: 17:00 – 21:00"
                : "Lun–Ven : 17 h – 21 h"}
              <br />
              {isEn
                ? "Sat–Sun: Events & tournaments"
                : "Sam–Dim : Événements et tournois"}
            </p>
          </div>
          <div className="space-y-1 md:text-left">
            <div className="font-semibold text-[var(--text-primary)] mb-1">
              {isEn ? "Location" : "Localisation"}
            </div>
            <p>
              {isEn
                ? "View on Google Maps:"
                : "Voir sur Google Maps :"}
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
          <span>
            {isEn
              ? "Based in Gatineau and Ottawa"
              : "Basé à Gatineau et Ottawa"}
          </span>
          <span>© GOSEC – Tous droits réservés</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
