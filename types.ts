export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface SonicConcept {
  title: string;
  texture: string;
  instruments: string[];
  poeticBrief: string;
  synthSettings?: string;
  visualHex?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  audioSrc?: string;
}