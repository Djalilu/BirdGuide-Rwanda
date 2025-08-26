import React from 'react';
import { Language, LocationInfo } from '../types';
import { BIRD_LOCATIONS, LOCALIZATION } from '../constants';

interface LocationsPageProps {
  language: Language;
  onSelectLocation: (location: LocationInfo) => void;
}

const LocationsPage: React.FC<LocationsPageProps> = ({ language, onSelectLocation }) => {
  const T = LOCALIZATION[language];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{T.birdwatchingLocations}</h2>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
          Rwanda, the 'Land of a Thousand Hills,' is an avian paradise. Its varied ecosystems, from misty montane forests to sun-drenched savannas, host a spectacular array of birdlife. Explore our curated list of premier birdwatching destinations and prepare to be amazed.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BIRD_LOCATIONS.map((location) => (
          <button 
            key={location.name} 
            onClick={() => onSelectLocation(location)}
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group text-left"
            aria-label={`View details for ${location.name}`}
          >
            <div className="relative">
              <img src={location.image} alt={location.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
              <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{location.name}</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-700 dark:text-slate-300 text-base">{location.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;