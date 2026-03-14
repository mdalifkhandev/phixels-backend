export type TPageSection = {
  sectionKey: string;
  head?: string;
  subHead?: string;
  caption?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
  video?: string;
};

export type TPageContent = {
  pageKey: string; // e.g., 'home', 'services', 'about'
  title: string;   // Human readable name e.g., 'Home Page'
  sections: TPageSection[];
};
