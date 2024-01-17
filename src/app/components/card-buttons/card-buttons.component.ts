import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../app.reducer';
import { TranslateService } from '../../service/translate.service';
import { State } from '../../redux/translate.reducer';
import { changeLanguage } from 'src/app/redux/translate.actions';

@Component({
  selector: 'app-card-buttons',
  templateUrl: './card-buttons.component.html',
  styleUrls: ['./card-buttons.component.scss'],
})
export class CardButtonsComponent implements OnInit, OnDestroy {
  @Input() viewBtnTranslate: boolean = false;

  subStore: Subscription = new Subscription();

  currentState!: State;

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subStore = this.store
      .select('translate')
      .subscribe((state) => (this.currentState = state));
  }

  ngOnDestroy(): void {
    this.subStore.unsubscribe();
  }

  translateText(): void {
    const CODE_LANGUAGE = `${this.currentState.language.code}|${this.currentState.translate.code}`;
    const TEXT_ORIGINAL = this.currentState.textTranslate.original;

    this.translateService
      .getTranslateText(TEXT_ORIGINAL, CODE_LANGUAGE)
      .subscribe(({ translatedText }) =>
        this.store.dispatch(
          changeLanguage({
            textTranslate: {
              original: this.currentState.textTranslate.original,
              translate: translatedText,
            },
          })
        )
      );
  }
}
