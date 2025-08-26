import React from 'react';
import { Language, LocationInfo } from '../types';
import { LOCALIZATION } from '../constants';

interface LocationDetailPageProps {
  language: Language;
  location: LocationInfo;
  onBack: () => void;
}

const DetailCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-100/80 dark:bg-slate-700/50 p-6 rounded-lg">
        <h4 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">{title}</h4>
        <div className="text-slate-700 dark:text-slate-300 space-y-2">{children}</div>
    </div>
);

const LocationDetailPage: React.FC<LocationDetailPageProps> = ({ language, location, onBack }) => {
  const T = LOCALIZATION[language];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
        <button onClick={onBack} className="mb-6 flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{T.back} to {T.locations}</span>
        </button>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
                <img src={location.image} alt={location.name} className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <h2 className="text-4xl font-bold text-white tracking-tight">{location.name}</h2>
                </div>
            </div>

            <div className="p-8 space-y-6">
                <p className="text-lg text-slate-600 dark:text-slate-300">{location.description}</p>
                
                <DetailCard title={T.keyBirdSpecies}>
                    <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        {location.keyBirds.map(bird => <li key={bird}>{bird}</li>)}
                    </ul>
                </DetailCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailCard title={T.bestTimeToVisit}>
                        <p>{location.bestTime}</p>
                    </DetailCard>
                    <DetailCard title={T.gettingThere}>
                        <p>{location.gettingThere}</p>
                    </DetailCard>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LocationDetailPage;