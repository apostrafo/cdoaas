import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("lt");
  
  useEffect(() => {
    // Get language from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem('preferred_language');
    
    if (langParam) {
      setCurrentLanguage(langParam);
      localStorage.setItem('preferred_language', langParam);
    } else if (savedLang) {
      setCurrentLanguage(savedLang);
    } else {
      // Default to Lithuanian
      setCurrentLanguage('lt');
      localStorage.setItem('preferred_language', 'lt');
    }
  }, []);
  
  const changeLanguage = (lang: string) => {
    // Don't proceed if we're already on this language
    if (currentLanguage === lang) return;
    
    console.log(`Switching language from ${currentLanguage} to ${lang}`);
    
    // Update localStorage
    localStorage.setItem('preferred_language', lang);
    
    // Create new URL with the language parameter
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('lang', lang);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    
    // Instead of manipulating DOM directly and then reloading,
    // just navigate to the new URL directly
    console.log(`Redirecting to: ${newUrl}`);
    window.location.href = newUrl;
  };
  
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant={currentLanguage === 'lt' ? "filled" : "outlined"}
        color="blue"
        onClick={() => changeLanguage('lt')}
        className="px-3 py-1 min-w-[40px]"
      >
        LT
      </Button>
      <Button 
        size="sm" 
        variant={currentLanguage === 'en' ? "filled" : "outlined"}
        color="blue"
        onClick={() => changeLanguage('en')}
        className="px-3 py-1 min-w-[40px]"
      >
        EN
      </Button>
    </div>
  );
} 