import React, { useRef, useState } from 'react';
import { Language, InputMode } from '../types';
import { LOCALIZATION } from '../constants';
import IconButton from './IconButton';
import Spinner from './Spinner';

interface HomePageProps {
  language: Language;
  onIdentify: (mode: InputMode, data: File | string) => void;
  isLoading: boolean;
  error: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ language, onIdentify, isLoading, error }) => {
  const T = LOCALIZATION[language];
  const photoInputRef = useRef<HTMLInputElement>(null);
  const soundInputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, mode: InputMode) => {
    const file = event.target.files?.[0];
    if (file) {
      onIdentify(mode, file);
    }
  };

  const handleTextIdentify = () => {
    if (description.trim()) {
      onIdentify('text', description.trim());
    }
  };
  
  const PhotoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>;
  const SoundIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>;
  const TextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>;

  return (
    <div className="flex-grow w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 text-center">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-8">{T.homeTitle}</h2>
          
          {error && <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">{T.error}! </strong>
            <span className="block sm:inline">{error}</span>
          </div>}

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            <IconButton icon={<PhotoIcon />} label={T.photo} onClick={() => photoInputRef.current?.click()} />
            <IconButton icon={<SoundIcon />} label={T.sound} onClick={() => soundInputRef.current?.click()} />
          </div>

          <input type="file" accept="image/*" ref={photoInputRef} onChange={(e) => handleFileChange(e, 'photo')} className="hidden" />
          <input type="file" accept="audio/*" ref={soundInputRef} onChange={(e) => handleFileChange(e, 'sound')} className="hidden" />
          
          <div className="w-full max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <TextIcon />
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={T.describeBird}
                rows={3}
                className="w-full pl-12 pr-28 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-200 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
              <button
                onClick={handleTextIdentify}
                className="absolute inset-y-0 right-0 m-2 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition"
                disabled={!description.trim()}
              >
                {T.identify}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;