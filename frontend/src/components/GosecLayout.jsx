import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const GosecLayout = ({ children }) => {
  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      {children}
    </div>
  );
};

export default GosecLayout;
