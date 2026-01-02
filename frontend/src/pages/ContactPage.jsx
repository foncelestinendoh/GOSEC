import React from "react";
import ContactSection from "@/components/sections/ContactSection";
import { Button } from "@/components/ui/button";

export const ContactPage = ({ onOpenContact }) => {
  return (
    <>
      <ContactSection />
      <div
        id="gosec-contact-form"
        className="container max-w-[700px] mx-auto px-4 pb-[64px] flex justify-center"
      >
        <Button className="btn-primary button-text" onClick={onOpenContact}>
          Open Contact Form
        </Button>
      </div>
    </>
  );
};

export default ContactPage;
