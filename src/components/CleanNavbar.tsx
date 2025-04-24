import React, { useState, useEffect } from "react";

// Add TypeScript declaration for window.siteTranslations
declare global {
  interface Window {
    siteTranslations?: Record<string, string>;
  }
}

export default function CleanNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('lt');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // Get language preference from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem('preferred_language');
    
    const currentLang = langParam || savedLang || 'lt';
    setLanguage(currentLang);
    
    // Load translations for the current language
    loadTranslations(currentLang);
    
    // Listen for translation loaded events from the global script
    const handleTranslationsLoaded = (event: CustomEvent) => {
      const { translations, language } = event.detail;
      setTranslations(translations);
      setLanguage(language);
    };
    
    document.addEventListener('translationsLoaded', handleTranslationsLoaded as EventListener);
    
    // Check if window.siteTranslations is already available
    if (window.siteTranslations) {
      setTranslations(window.siteTranslations);
    }
    
    return () => {
      document.removeEventListener('translationsLoaded', handleTranslationsLoaded as EventListener);
    };
  }, []);
  
  const loadTranslations = (lang: string) => {
    fetch(`/translations/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        setTranslations(data);
      })
      .catch(error => {
        console.error('Error loading translations:', error);
      });
  };

  const changeLanguage = (newLang: string) => {
    // Save language preference
    localStorage.setItem('preferred_language', newLang);
    setLanguage(newLang);
    setShowLanguageDropdown(false);
    
    // Load new translations
    loadTranslations(newLang);
    
    // Reload page with new language parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.location.href = url.toString();
  };

  return (
    <nav className="bg-dark-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-2xl font-bold text-white" data-i18n="hero_title">
                {translations?.hero_title || "CDO as a Service"}
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/about" className="border-transparent text-gray-300 hover:border-blue-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" data-i18n="nav_about">
                {translations?.nav_about || "About"}
              </a>
              <a href="/services" className="border-transparent text-gray-300 hover:border-blue-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" data-i18n="nav_services">
                {translations?.nav_services || "Services"}
              </a>
              <a href="/approach" className="border-transparent text-gray-300 hover:border-blue-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" data-i18n="nav_approach">
                {translations?.nav_approach || "Approach"}
              </a>
              <a href="/tools" className="border-transparent text-gray-300 hover:border-blue-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" data-i18n="nav_tools">
                {translations?.nav_tools || "Tools"}
              </a>
              <a href="/blog" className="border-transparent text-gray-300 hover:border-blue-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" data-i18n="nav_blog">
                {translations?.nav_blog || "Blog"}
              </a>
              <a href="/contact" className="border-transparent text-gray-300 hover:border-blue-500 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" data-i18n="nav_contact">
                {translations?.nav_contact || "Contact"}
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Language Switcher */}
            <div className="relative mr-4">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <span className="mr-1">{language.toUpperCase()}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-24 bg-dark-500 border border-gray-700 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage('lt')}
                      className={`block w-full text-left px-4 py-2 text-sm ${language === 'lt' ? 'bg-dark-400 text-white' : 'text-gray-300 hover:bg-dark-400 hover:text-white'}`}
                    >
                      LT
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-dark-400 text-white' : 'text-gray-300 hover:bg-dark-400 hover:text-white'}`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sign in and Sign up buttons hidden with display: none */}
            <div className="hidden">
              <a href="/login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white">
                Sign in
              </a>
              <a href="/signup" className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                Sign up
              </a>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-dark-500">
          <div className="pt-2 pb-3 space-y-1">
            <a href="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:bg-dark-400 hover:border-blue-500 hover:text-white" data-i18n="nav_about">
              {translations?.nav_about || "About"}
            </a>
            <a href="/services" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:bg-dark-400 hover:border-blue-500 hover:text-white" data-i18n="nav_services">
              {translations?.nav_services || "Services"}
            </a>
            <a href="/approach" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:bg-dark-400 hover:border-blue-500 hover:text-white" data-i18n="nav_approach">
              {translations?.nav_approach || "Approach"}
            </a>
            <a href="/tools" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:bg-dark-400 hover:border-blue-500 hover:text-white" data-i18n="nav_tools">
              {translations?.nav_tools || "Tools"}
            </a>
            <a href="/blog" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:bg-dark-400 hover:border-blue-500 hover:text-white" data-i18n="nav_blog">
              {translations?.nav_blog || "Blog"}
            </a>
            <a href="/contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-300 hover:bg-dark-400 hover:border-blue-500 hover:text-white" data-i18n="nav_contact">
              {translations?.nav_contact || "Contact"}
            </a>
            
            {/* Mobile Language Switcher */}
            <div className="flex pl-3 pr-4 py-2 border-l-4 border-transparent">
              <button
                onClick={() => changeLanguage('lt')}
                className={`mr-3 text-sm font-medium ${language === 'lt' ? 'text-white font-bold' : 'text-gray-300'}`}
              >
                LT
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`text-sm font-medium ${language === 'en' ? 'text-white font-bold' : 'text-gray-300'}`}
              >
                EN
              </button>
            </div>
          </div>
          {/* Hide sign in and sign up buttons in mobile view too */}
          <div className="hidden pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-4">
              <a href="/login" className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white">
                Sign in
              </a>
              <a href="/signup" className="ml-2 block px-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 