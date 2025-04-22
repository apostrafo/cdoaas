import { useState, useEffect } from 'react';
import { getTranslation } from '../utils/translations';

export function useTranslation() {
  const [language, setLanguage] = useState<string>('lt');
  
  useEffect(() => {
    // Get language from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem('preferred_language');
    
    if (langParam) {
      setLanguage(langParam);
      localStorage.setItem('preferred_language', langParam);
    } else if (savedLang) {
      setLanguage(savedLang);
    } else {
      // Default to Lithuanian if no language is specified
      setLanguage('lt');
      localStorage.setItem('preferred_language', 'lt');
    }
  }, []);

  const t = (key: string) => getTranslation(key, language);
  
  return { t, language };
} 