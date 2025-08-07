import React from 'react';
import { Language } from '../types';
import { LOCALIZATION } from '../constants';

interface AboutPageProps {
  language: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const T = LOCALIZATION[language];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 text-center">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{T.aboutTitle}</h2>
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
        <p className="text-lg text-slate-700 dark:text-slate-200 mb-6">
          {T.aboutText}
        </p>
        <div className="border-t border-slate-200 dark:border-slate-600 my-6"></div>
        <p className="text-slate-600 dark:text-slate-300 italic">
          {T.generalTip}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;