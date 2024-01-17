import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//* NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CardInputComponent } from './components/card-input/card-input.component';
import { CardTranslateComponent } from './components/card-translate/card-translate.component';
import { CardButtonsComponent } from './components/card-buttons/card-buttons.component';
import { CardLanguagesComponent } from './components/card-languages/card-languages.component';
import { TranslateService } from './service/translate.service';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CardTranslateComponent,
    CardButtonsComponent,
    CardLanguagesComponent,
    CardInputComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
