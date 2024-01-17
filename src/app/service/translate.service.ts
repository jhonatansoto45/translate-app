import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LanguageCode,
  ResponseData,
  ResponseTranslate,
} from '../interface/translate.interface';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private __listLanguage: LanguageCode[] = [
    {
      language: 'English',
      code: 'en',
    },
    {
      language: 'French',
      code: 'fr',
    },
    {
      language: 'Spanish',
      code: 'es',
      showButton: true,
    },
  ];

  private readonly baseUrl: string = environment.baseUrl;

  loaderCom!: ComponentRef<LoaderComponent>;

  constructor(private http: HttpClient) {}

  get languages() {
    return this.__listLanguage;
  }

  getTranslateText(
    value: string,
    languageCode: string
  ): Observable<ResponseData> {
    return this.http
      .get<ResponseTranslate>(
        `${this.baseUrl}/get?q=${value}&langpair=${languageCode}`
      )
      .pipe(map((response: any) => response.responseData));
  }

  loaderComponent(vcf: ViewContainerRef, open: boolean): void {
    if (vcf) vcf.clear();

    if (open) this.loaderCom = vcf.createComponent(LoaderComponent);
    else this.loaderCom.destroy();
  }
}
