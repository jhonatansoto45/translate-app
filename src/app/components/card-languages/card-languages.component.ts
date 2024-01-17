import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TranslateService } from '../../service/translate.service';
import { AppState } from '../../app.reducer';
import { LanguageCode } from '../../interface/translate.interface';
import { chooseLanguage } from '../../redux/translate.actions';
import { State } from '../../redux/translate.reducer';

@Component({
  selector: 'app-card-languages',
  templateUrl: './card-languages.component.html',
  styleUrls: ['./card-languages.component.scss'],
})
export class CardLanguagesComponent implements OnInit, OnDestroy {
  @Input() secondCard: boolean = false;

  languageActive!: State;

  subStore: Subscription = new Subscription();

  constructor(
    private translateService: TranslateService,
    private store: Store<AppState>,
    private vcf: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.subStore = this.store
      .select('translate')
      .subscribe((state) => (this.languageActive = state));
  }

  ngOnDestroy(): void {
    this.subStore.unsubscribe();
  }

  readonly valideActiveItem = (language: LanguageCode): boolean => {
    return this.secondCard &&
      language.code === this.languageActive.translate?.code
      ? true
      : !this.secondCard && language.code === this.languageActive.language?.code
      ? true
      : false;
  };

  get listLanguages(): LanguageCode[] {
    return this.translateService.languages;
  }

  changeLanguage(active: LanguageCode, secondCard: boolean): void {
    const property = secondCard ? 'translate' : 'language';

    const copyLanguageActive = { ...this.languageActive };

    copyLanguageActive[property] = {
      ...this.languageActive,
      language: active.language,
      code: active.code,
      showButton: active.showButton,
    };

    this.store.dispatch(chooseLanguage(copyLanguageActive));
  }

  exchangeLanguage(): void {
    this.translateService.loaderComponent(this.vcf, true);
    this.store.dispatch(
      chooseLanguage({
        language: { ...this.languageActive.translate },
        translate: { ...this.languageActive.language },
      })
    );
    this.translateService.loaderComponent(this.vcf, false);
  }
}
