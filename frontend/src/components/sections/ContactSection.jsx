import React from "react";
import { Mail, Phone } from "lucide-react";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-[64px] bg-[var(--bg-subtle)]/60 border-t border-[var(--border-light)]"
    >
      <div className="container max-w-[900px] mx-auto px-4 grid gap-10 md:grid-cols-[1.3fr_minmax(0,1fr)] items-start">
        <div data-aos="fade-up" className="space-y-4">
          <h2 className="heading-1">Contact & Support</h2>
          <p className="body-large max-w-xl">
            Our team is here to help you find the right program for you, your
            family, or your organization.
            <span className="block mt-1">
              Notre équipe est là pour vous accompagner et vous orienter vers le
              bon programme.
            </span>
          </p>
          <div className="space-y-3 body-medium">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--brand-dark)]" />
              <span>info@gosec.ca (example)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--brand-dark)]" />
              <span>+1 (000) 000-0000</span>
            </div>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          className="network-card space-y-2 body-small"
        >
          <p>
            Stay updated on tournaments, community events, workshops, and family
            activities.
          </p>
          <p>
            Restez informés de nos tournois, événements communautaires, ateliers et
            activités familiales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
