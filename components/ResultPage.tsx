import React from 'react';
import { BirdData, Language } from '../types';
import { LOCALIZATION } from '../constants';

interface ResultPageProps {
  language: Language;
  data: BirdData;
  resultImage?: string;
  onBack: () => void;
}

const InfoCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-100/80 dark:bg-slate-700/50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">{title}</h4>
        <div className="text-slate-700 dark:text-slate-300">{children}</div>
    </div>
);

const ResultPage: React.FC<ResultPageProps> = ({ language, data, resultImage, onBack }) => {
  const T = LOCALIZATION[language];

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fade-in">
        <button onClick={onBack} className="mb-6 flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{T.back}</span>
        </button>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{data.birdName}</h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 italic">{data.scientificName}</p>
            </div>
            
            {resultImage && <img src={resultImage} alt={data.birdName} className="w-full h-64 object-cover bg-slate-200 dark:bg-slate-700" />}
            
            <div className="p-6 space-y-4">
                <InfoCard title={T.foundIn}>{data.location}</InfoCard>
                <InfoCard title={T.description}>{data.description}</InfoCard>
                
                <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{T.funFacts}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InfoCard title={T.diet}>{data.funFacts.diet}</InfoCard>
                        <InfoCard title={T.habitat}>{data.funFacts.habitat}</InfoCard>
                        <InfoCard title={T.behavior}>{data.funFacts.behavior}</InfoCard>
                    </div>
                </div>

                <InfoCard title={T.spottingTip}>{data.spottingTip}</InfoCard>
            </div>
        </div>
    </div>
  );
};

export default ResultPage;