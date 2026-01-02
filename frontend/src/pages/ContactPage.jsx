import React, { useState } from "react";
import ContactSection from "@/components/sections/ContactSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactPage = () => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    relation: "",
    city: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("gosec_contact") || "[]");
    existing.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("gosec_contact", JSON.stringify(existing));
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      topic: "",
      relation: "",
      city: "",
      message: "",
    });
    // In a real app, show toast; here we keep it simple
    alert(
      isEn
        ? "Your message has been saved locally (demo only)."
        : "Votre message a été enregistré localement (démonstration seulement)."
    );
  };

  return (
    <>
      <ContactSection />
      <section className="pt-4 pb-[72px] bg-white">
        <div className="container max-w-[700px] mx-auto px-4">
          <div className="space-y-2 text-center mb-4">
            <h3 className="heading-3 text-black">
              {isEn ? "Send us a message" : "Envoyez-nous un message"}
            </h3>
            <p className="body-medium text-black/80">
              {isEn
                ? "Share your questions about programs, partnerships, volunteering, or support. We’ll do our best to respond quickly."
                : "Partagez vos questions sur les programmes, les partenariats, le bénévolat ou le soutien. Nous ferons de notre mieux pour répondre rapidement."}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 body-medium max-w-[640px] mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  {isEn ? "First name" : "Prénom"}
                </label>
                <Input
                  required
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  {isEn ? "Last name" : "Nom"}
                </label>
                <Input
                  required
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Email
                </label>
                <Input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  {isEn ? "Phone (optional)" : "Téléphone (facultatif)"}
                </label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  {isEn ? "Subject" : "Sujet"}
                </label>
                <Input
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  {isEn ? "How are you connected to GOSEC?" : "Quel est votre lien avec GOSEC ?"}
                </label>
                <Input
                  name="relation"
                  value={form.relation}
                  onChange={handleChange}
                  placeholder={
                    isEn
                      ? "Parent, player, volunteer, partner, newcomer..."
                      : "Parent, joueur, bénévole, partenaire, nouvel arrivant..."
                  }
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-black">
                {isEn ? "City / Area" : "Ville / Secteur"}
              </label>
              <Input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder={isEn ? "Gatineau, Ottawa, etc." : "Gatineau, Ottawa, etc."}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-black">
                {isEn ? "Message" : "Message"}
              </label>
              <Textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Button
                type="submit"
                className="btn-primary button-text bg-[#e53935] hover:bg-[#c62828] text-white px-8"
              >
                {isEn ? "Send message" : "Envoyer le message"}
              </Button>
            </div>
            <p className="body-small text-center text-black/60 mt-2">
              {isEn
                ? "This form is a demo only – your message is stored locally in your browser (no email is sent)."
                : "Ce formulaire est une démonstration – votre message est stocké localement dans votre navigateur (aucun courriel n’est envoyé)."}
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
