import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProgramsSection from "@/components/sections/ProgramsSection";

export const HomePage = ({ onOpenJoin, onOpenMember }) => {
  return (
    <>
      <HeroSection onOpenJoin={onOpenJoin} onOpenMember={onOpenMember} />
      <AboutSection />
      <ProgramsSection />
    </>
  );
};

export default HomePage;
