export type TLegalSection = {
  title: string;
  content: string;
};

export type TLegalContent = {
  privacyPolicy: TLegalSection[];
  termsConditions: TLegalSection[];
};
