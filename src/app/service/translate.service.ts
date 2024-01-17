import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LanguageCode,
  ResponseData,
  ResponseTranslate,
} from '../interface/translate.interface';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';

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
}
