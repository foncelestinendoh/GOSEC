import React from "react";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section
      id="contact"
      className="py-[72px] bg-[#F7F7F7] border-t border-[var(--border-light)]"
    >
      <div className="container max-w-[700px] mx-auto px-4 flex flex-col items-center">
        <div data-aos="fade-up" className="space-y-4 text-center">
          <h2 className="heading-1 text-black mt-8 md:mt-10 mb-3">
            {isEn ? "Contact & Support" : "Contact et soutien"}
          </h2>
          <p className="body-large max-w-xl text-black/80">
            {isEn
              ? "Our team is here to help you find the right program for you, your family, or your organization."
              : "Notre équipe est là pour vous aider à trouver le bon programme pour vous, votre famille ou votre organisation."}
          </p>
          <div className="space-y-3 body-medium">
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-[var(--brand-dark)]" />
              <span>info@gosec.ca (example)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-[var(--brand-dark)]" />
              <span>+1 (000) 000-0000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
