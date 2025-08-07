import React, { useState, useRef, useEffect } from 'react';
import { Language, Page, Theme } from '../types';
import { LOCALIZATION, LANGUAGES } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: Page;
  setPage: (page: Page) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, currentPage, setPage, theme, setTheme }) => {
  const T = LOCALIZATION[language];
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const NavButton: React.FC<{ page: Page; label: string; isMobile?: boolean; }> = ({ page, label, isMobile = false }) => (
    <button
      onClick={() => {
        setPage(page);
        setIsMenuOpen(false);
      }}
      className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        currentPage === page
          ? 'bg-emerald-600 text-white'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
      } ${isMobile ? 'block' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <header className="w-full max-w-4xl mx-auto p-4 flex justify-between items-center" ref={dropdownRef}>
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L9 9.61V16a1 1 0 001 1h2a1 1 0 001-1v-6.39l6.394-2.69a1 1 0 000-1.84l-7-3zM10 8a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">BirdGuide <span className="text-emerald-500 dark:text-emerald-400">Rwanda</span></h1>
      </div>
      <div className="flex items-center space-x-2">
        {/* Desktop Nav */}
        <nav className="hidden sm:flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <NavButton page="home" label={T.homeTitle.split('?')[0]} />
          <NavButton page="locations" label={T.locations} />
          <NavButton page="about" label={T.about} />
        </nav>
        
        {/* Language Dropdown */}
        <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.944A5.962 5.962 0 0110 6c.51 0 1 .062 1.474.175a.5.5 0 00.597-.449 1 1 0 00-.868-1.125A7.962 7.962 0 0010 4c-2.21 0-4.155 1.096-5.449 2.766a.5.5 0 00.881.478zM15.449 12.766a.5.5 0 00-.881-.478A5.962 5.962 0 0110 14c-.51 0-1-.062-1.474-.175a.5.5 0 00-.597.449 1 1 0 00.868 1.125A7.962 7.962 0 0010 16c2.21 0 4.155-1.096 5.449-2.766zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            </button>
            {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                    {LANGUAGES.map(lang => (
                        <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }} className="text-left w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                            {lang.nativeName}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-3.536a1 1 0 01.018 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.4-.018zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.95 14.536l.707-.707a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414zM2.707 9.293a1 1 0 01.018-1.414l.707-.707a1 1 0 10-1.414 1.414l-.707.707a1 1 0 011.4-.018zM7 4a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
        </button>

        {/* Mobile Menu Button */}
        <div className="relative sm:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            </button>
            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                    <div className="p-2 space-y-1">
                        <NavButton page="home" label={T.homeTitle.split('?')[0]} isMobile={true} />
                        <NavButton page="locations" label={T.locations} isMobile={true} />
                        <NavButton page="about" label={T.about} isMobile={true} />
                    </div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;