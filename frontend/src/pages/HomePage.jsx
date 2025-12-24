import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import HomeHeroImageStrip from "@/components/sections/HomeHeroImageStrip";

export const HomePage = ({ onOpenJoin, onOpenMember }) => {
  return (
    <>
      <HomeHeroImageStrip />
      <HeroSection onOpenJoin={onOpenJoin} onOpenMember={onOpenMember} />
    </>
  );
};

export default HomePage;
