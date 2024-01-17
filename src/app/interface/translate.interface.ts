export type CodeLanguage = 'es' | 'en' | 'fr';

export interface LanguageCode {
  language: string;
  code: CodeLanguage;
  showButton?: boolean;
}

export interface TextTranslateI {
  original: string;
  translate: string;
}

export interface ResponseTranslate {
  responseData:    ResponseData;
  quotaFinished:   boolean;
  mtLangSupported: null;
  responseDetails: string;
  responseStatus:  number;
  responderId:     null;
  exception_code:  null;
  matches:         Match[];
}

export interface Match {
  id:                 number | string;
  segment:            string;
  translation:        string;
  source:             string;
  target:             string;
  quality:            number | string;
  reference:          null | string;
  "usage-count":      number;
  subject:            boolean | string;
  "created-by":       string;
  "last-updated-by":  string;
  "create-date":      string;
  "last-update-date": string;
  match:              number;
  model?:             string;
}

export interface ResponseData {
  translatedText: string;
  match:          number;
}
