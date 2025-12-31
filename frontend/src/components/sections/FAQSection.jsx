import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sections } from "@/mock/gosecMock";
import { useLanguage } from "@/contexts/LanguageContext";

export const FAQSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section id="faqs" className="py-[72px] bg-[var(--bg-page)]">
      <div className="container max-w-[900px] mx-auto px-4 space-y-8">
        <div className="max-w-2xl" data-aos="fade-up">
          <h2 className="heading-2 mt-8 mb-3 text-black">{isEn ? "Common Questions" : "Questions fréquentes"}</h2>
          <p className="body-medium text-black/80">
            {isEn
              ? "Learn more about who GOSEC serves, how to join, and where activities take place."
              : "En savoir plus sur qui GOSEC dessert, comment participer et où ont lieu les activités."}
          </p>
        </div>
        <div data-aos="fade-up" data-aos-delay="150">
          <Accordion type="single" collapsible className="w-full">
            {sections.faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-[var(--border-light)] bg-white/80"
              >
                <AccordionTrigger className="body-medium text-left">
                  <div>
                    <div>{isEn ? faq.questionEn : faq.questionFr}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="body-medium">
                  <div>
                    <p>{isEn ? faq.answerEn : faq.answerFr}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
