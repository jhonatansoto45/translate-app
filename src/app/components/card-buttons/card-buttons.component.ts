import {
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../app.reducer';
import { TranslateService } from '../../service/translate.service';
import { State } from '../../redux/translate.reducer';
import { changeLanguage } from '../../redux/translate.actions';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-card-buttons',
  templateUrl: './card-buttons.component.html',
  styleUrls: ['./card-buttons.component.scss'],
})
export class CardButtonsComponent implements OnInit, OnDestroy {
  @Input() viewBtnTranslate: boolean = false;

  subStore: Subscription = new Subscription();

  currentState!: State;

  loaderCom!: ComponentRef<LoaderComponent>;

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService,
    private vcf: ViewContainerRef
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
    this.openLoader(true);
    const CODE_LANGUAGE = `${this.currentState.language.code}|${this.currentState.translate.code}`;
    const TEXT_ORIGINAL = this.currentState.textTranslate.original;

    this.translateService
      .getTranslateText(TEXT_ORIGINAL, CODE_LANGUAGE)
      .subscribe(({ translatedText }) => {
        this.store.dispatch(
          changeLanguage({
            textTranslate: {
              original: this.currentState.textTranslate.original,
              translate: translatedText,
            },
          })
        );
        this.openLoader(false);
      });
  }

  openLoader(open: boolean): void {
    if (this.vcf) this.vcf.clear();

    if (open) this.loaderCom = this.vcf.createComponent(LoaderComponent);
    else this.loaderCom.destroy();
  }
}
