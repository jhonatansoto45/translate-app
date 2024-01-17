import { ActionReducerMap } from '@ngrx/store';
import { State, translateReducer } from './redux/translate.reducer';

export interface AppState {
  translate: State;
}

export const appReducers: ActionReducerMap<AppState> = {
  translate: translateReducer,
};
