import React, { useState, useCallback, useEffect } from 'react';
import { Language, Page, BirdData, InputMode, Theme } from './types';
import { LOCALIZATION } from './constants';
import { identifyBird, generateBirdImage } from './services/geminiService';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ResultPage from './components/ResultPage';
import LocationsPage from './components/LocationsPage';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [birdData, setBirdData] = useState<BirdData | null>(null);
  const [resultImage, setResultImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleIdentification = useCallback(async (mode: InputMode, data: File | string) => {
    if (!language) return;

    setIsLoading(true);
    setError(null);
    setBirdData(null);
    setResultImage(undefined);
    
    let tempImage: string | undefined;
    if (mode === 'photo' && data instanceof File) {
        tempImage = URL.createObjectURL(data);
        setResultImage(tempImage);
    }
    
    try {
      const result = await identifyBird(mode, data, language);
      
      if (result.error || result.birdName === 'Unknown' || result.birdName === 'Error') {
          const T = LOCALIZATION[language] || LOCALIZATION['en'];
          setError(result.error || T.errorNotFound);
          setBirdData(null);
      } else {
          setBirdData(result);
          let finalImage = tempImage;

          if (mode === 'text') {
              try {
                  const imageData = await generateBirdImage(result, language);
                  finalImage = `data:image/jpeg;base64,${imageData}`;
              } catch (imgError) {
                  console.error("Could not generate bird image:", imgError);
                  // Proceed without a generated image, don't show an error to the user
              }
          }
          setResultImage(finalImage);
          setCurrentPage('result');
      }
    } catch (e) {
      const T = LOCALIZATION[language] || LOCALIZATION['en'];
      setError(T.errorMessage);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage language={language} onIdentify={handleIdentification} isLoading={isLoading} error={error} />;
      case 'result':
        return birdData ? <ResultPage language={language} data={birdData} onBack={() => {setCurrentPage('home'); setBirdData(null); setError(null); setResultImage(undefined);}} resultImage={resultImage} /> : <HomePage language={language} onIdentify={handleIdentification} isLoading={isLoading} error={error} />;
      case 'locations':
        return <LocationsPage language={language} />;
      case 'about':
        return <AboutPage language={language} />;
      default:
        setCurrentPage('home');
        return <HomePage language={language} onIdentify={handleIdentification} isLoading={isLoading} error={error} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center font-sans bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header language={language} setLanguage={handleSetLanguage} currentPage={currentPage} setPage={setCurrentPage} theme={theme} setTheme={setTheme} />
      <main className="w-full flex-grow flex flex-col justify-center items-center">
        {renderPage()}
      </main>
      <footer className="w-full text-center p-4 text-xs text-slate-500 dark:text-slate-400">
        <p>Powered by Google Gemini. For educational and recreational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;