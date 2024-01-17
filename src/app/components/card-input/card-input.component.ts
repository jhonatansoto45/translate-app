import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { changeLanguage } from 'src/app/redux/translate.actions';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss'],
})
export class CardInputComponent implements OnInit, OnDestroy {
  @Input() secondCard: boolean = false;

  textOriginal: string = '';
  textTranslate: string = '';

  readonly MAX_LENGTH: number = 500;

  subStore: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subStore = this.store
      .select('translate')
      .subscribe(({ textTranslate }) => {
        this.textOriginal = textTranslate.original;
        this.textTranslate = textTranslate.translate;
      });
  }

  ngOnDestroy(): void {
    this.subStore.unsubscribe();
  }

  onChangeValue(value: string): void {
    this.store.dispatch(
      changeLanguage({ textTranslate: { original: value, translate: '' } })
    );
  }
}
