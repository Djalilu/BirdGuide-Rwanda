export type Language = string;
export type Page = 'home' | 'result' | 'locations' | 'about';
export type InputMode = 'photo' | 'sound' | 'text';
export type Theme = 'light' | 'dark';

export interface FunFacts {
  diet: string;
  habitat: string;
  behavior: string;
}

export interface BirdData {
  birdName: string;
  scientificName: string;
  location: string;
  description: string;
  funFacts: FunFacts;
  spottingTip: string;
  error?: string;
}

export interface LocationInfo {
  name: string;
  description: string;
  image: string;
}

export interface LanguageOption {
    code: Language;
    name: string;
    nativeName: string;
}