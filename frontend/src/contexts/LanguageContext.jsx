import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("gosec_language") || "en";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("gosec_language", language);
    } catch (e) {
      // ignore storage errors in this simple mock setup
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
