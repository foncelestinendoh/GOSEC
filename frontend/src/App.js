import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "@/components/ui/sonner";
import GosecLayout from "@/components/GosecLayout";
import HeroSection from "@/components/sections/HeroSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import { JoinProgramDialog } from "@/components/sections/forms/JoinProgramDialog";
import { BecomeMemberDialog } from "@/components/sections/forms/BecomeMemberDialog";
import { ContactDialog } from "@/components/sections/forms/ContactDialog";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Home = () => {
  const [openJoin, setOpenJoin] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const handleFormSubmitted = (type) => {
    toast.success(
      type === "join"
        ? "Thank you – your interest in GOSEC programs has been saved locally (mock)."
        : type === "member"
        ? "Your membership request has been stored locally (mock)."
        : "Your contact request has been stored locally (mock)."
    );
  };

  return (
    <GosecLayout>
      <SiteHeader
        onJoinClick={() => setOpenJoin(true)}
        onMemberClick={() => setOpenMember(true)}
        onContactClick={() => setOpenContact(true)}
        onNavigate={scrollToId}
      />
      <main>
        <HeroSection
          onOpenJoin={() => setOpenJoin(true)}
          onOpenMember={() => setOpenMember(true)}
        />
        <ProgramsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />

      <JoinProgramDialog
        open={openJoin}
        onOpenChange={setOpenJoin}
        onSubmitted={() => handleFormSubmitted("join")}
      />
      <BecomeMemberDialog
        open={openMember}
        onOpenChange={setOpenMember}
        onSubmitted={() => handleFormSubmitted("member")}
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
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
