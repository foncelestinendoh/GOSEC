import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "@/components/ui/sonner";
import GosecLayout from "@/components/GosecLayout";
import { JoinProgramDialog } from "@/components/sections/forms/JoinProgramDialog";
import { DonateDialog } from "@/components/sections/forms/DonateDialog";
import { ContactDialog } from "@/components/sections/forms/ContactDialog";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProgramsPage from "@/pages/ProgramsPage";
import FAQPage from "@/pages/FAQPage";
import ContactPage from "@/pages/ContactPage";
import ProgramDetailPage from "@/pages/ProgramDetailPage";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Home = () => {
  const [openJoin, setOpenJoin] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const handleFormSubmitted = (type) => {
    toast.success(
      type === "join"
        ? "Thank you – your interest in GOSEC programs has been saved locally (mock)."
        : type === "donate"
        ? "Thank you – your donation pledge has been stored locally (mock)."
        : "Your contact request has been stored locally (mock)."
    );
  };

  return (
    <GosecLayout>
      <SiteHeader
        onJoinClick={() => setOpenJoin(true)}
        onMemberClick={() => setOpenDonate(true)}
        onContactClick={() => setOpenContact(true)}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenJoin={() => setOpenJoin(true)}
                onOpenMember={() => setOpenDonate(true)}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:programId" element={<ProgramDetailPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route
            path="/contact"
            element={<ContactPage onOpenContact={() => setOpenContact(true)} />}
          />
        </Routes>
      </main>
      <SiteFooter />

      <JoinProgramDialog
        open={openJoin}
        onOpenChange={setOpenJoin}
        onSubmitted={() => handleFormSubmitted("join")}
      />
      <DonateDialog
        open={openDonate}
        onOpenChange={setOpenDonate}
        onSubmitted={() => handleFormSubmitted("donate")}
      />
      <ContactDialog
        open={openContact}
        onOpenChange={setOpenContact}
        onSubmitted={() => handleFormSubmitted("contact")}
      />
      <Toaster richColors position="bottom-right" />
    </GosecLayout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
