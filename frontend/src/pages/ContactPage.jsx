import React from "react";
import ContactSection from "@/components/sections/ContactSection";
import { Button } from "@/components/ui/button";

export const ContactPage = ({ onOpenContact }) => {
  return (
    <>
      <ContactSection />
      <div className="container max-w-[900px] mx-auto px-4 pb-[64px] flex justify-center">
        <Button className="btn-primary button-text" onClick={onOpenContact}>
          Open Contact Form / Ouvrir le formulaire de contact
        </Button>
      </div>
    </>
  );
};

export default ContactPage;
