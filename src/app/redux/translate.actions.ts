import { createAction, props } from '@ngrx/store';
import { LanguageCode, TextTranslateI } from '../interface/translate.interface';

export const chooseLanguage = createAction(
  '[Translate Component] chooseLanguage',
  props<{ language: LanguageCode; translate: LanguageCode }>()
);

export const changeLanguage = createAction(
  '[Translate Component] changeLanguage',
  props<{ textTranslate: TextTranslateI }>()
);
