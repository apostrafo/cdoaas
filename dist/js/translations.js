// Client-side script to handle translations
document.addEventListener('DOMContentLoaded', function() {
  // Function to apply translations
  function applyTranslations(language) {
    console.log('Applying translations for language:', language);
    fetch(`/translations/${language}.json`)
      .then(response => response.json())
      .then(translations => {
        document.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          if (translations[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
              element.placeholder = translations[key];
              // For labels, also update the text content
              if (element.previousElementSibling && element.previousElementSibling.hasAttribute('for')) {
                element.previousElementSibling.textContent = translations[key];
              }
            } else if (element.tagName === 'BUTTON') {
              element.textContent = translations[key];
            } else {
              element.textContent = translations[key];
            }
          } else {
            console.warn(`Translation key not found: ${key}`);
          }
        });
      })
      .catch(error => {
        console.error('Error loading translations:', error);
      });
  }
  
  // Get language preference
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  const savedLang = localStorage.getItem('preferred_language');
  
  // Apply translations based on language preference
  const language = langParam || savedLang || 'lt';
  console.log('Selected language:', language);
  applyTranslations(language);
  
  // Save language preference
  if (langParam) {
    localStorage.setItem('preferred_language', langParam);
  }
  
  // Update all navigation links to include the current language
  const currentLang = langParam || savedLang || 'lt';
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only process internal links (not external or hash links)
    if (href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#')) {
      // Don't modify if it already has a lang parameter
      if (!href.includes('?lang=') && !href.includes('&lang=')) {
        const hasParams = href.includes('?');
        const newHref = hasParams 
          ? `${href}&lang=${currentLang}` 
          : `${href}?lang=${currentLang}`;
        link.setAttribute('href', newHref);
      }
    }
  });
}); 