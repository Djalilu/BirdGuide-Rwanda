import React from 'react';
import { Language } from '../types';
import { BIRD_LOCATIONS, LOCALIZATION } from '../constants';

interface LocationsPageProps {
  language: Language;
}

const LocationsPage: React.FC<LocationsPageProps> = ({ language }) => {
  const T = LOCALIZATION[language];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">{T.birdwatchingLocations}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BIRD_LOCATIONS.map((location) => (
          <div key={location.name} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
            <img src={location.image} alt={location.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-2">{location.name}</h3>
              <p className="text-slate-700 dark:text-slate-300">{location.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;