import { Action, createReducer, on } from '@ngrx/store';
import { changeLanguage, chooseLanguage } from './translate.actions';
import { LanguageCode, TextTranslateI } from '../interface/translate.interface';

export interface State {
  language: LanguageCode;
  translate: LanguageCode;
  textTranslate: TextTranslateI;
}

export const initialState: State = {
  language: { language: 'English', code: 'en' },
  translate: { language: 'French', code: 'fr' },
  textTranslate: { original: '', translate: '' },
};

const _translateReducer = createReducer(
  initialState,

  on(chooseLanguage, (state, { language, translate }) => ({
    ...state,
    language,
    translate,
  })),
  on(changeLanguage, (state, { textTranslate }) => ({
    ...state,
    textTranslate,
  }))
);

export function translateReducer(state: any, action: Action) {
  return _translateReducer(state, action);
}
