import React from 'react';

export default function CleanFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-500 border-t border-gray-700 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h3 className="text-lg font-semibold text-white" data-i18n="company_name">CDO as a Service</h3>
            <p className="text-gray-400 text-sm" data-i18n="company_description">
              Empowering organizations with data-driven decision making and strategic leadership.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook text-xl"></i>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase" data-i18n="services">Services</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="/services" className="text-base text-gray-400 hover:text-white" data-i18n="data_strategy_footer">
                      Data Strategy
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="text-base text-gray-400 hover:text-white" data-i18n="analytics">
                      Analytics
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="text-base text-gray-400 hover:text-white" data-i18n="consulting">
                      Consulting
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase" data-i18n="about">About</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="/about" className="text-base text-gray-400 hover:text-white" data-i18n="our_team">
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a href="/approach" className="text-base text-gray-400 hover:text-white" data-i18n="our_approach">
                      Our Approach
                    </a>
                  </li>
                  <li>
                    <a href="/tools" className="text-base text-gray-400 hover:text-white" data-i18n="tools_footer">
                      Tools
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase" data-i18n="resources">Resources</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="/blog" className="text-base text-gray-400 hover:text-white" data-i18n="blog">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-base text-gray-400 hover:text-white" data-i18n="contact_us_footer">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase" data-i18n="legal">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-400 hover:text-white" data-i18n="privacy">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-400 hover:text-white" data-i18n="terms">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center" data-i18n="copyright">
            &copy; {currentYear} CDO as a Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 