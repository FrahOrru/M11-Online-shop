import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONFIG, APP_CONFIG_TOKEN, AppConfig } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public lannguage$: Observable<'en' | 'fr'>;
  public lannguageSubject = new BehaviorSubject<'en' | 'fr'>(this.config.language)
  

  constructor(@Inject(APP_CONFIG_TOKEN) private config: AppConfig) {
    this.lannguage$ = this.lannguageSubject.asObservable();
  }

  setLanguage(language: 'en' | 'fr') {
    if(language !== this.config.language) {
      this.lannguageSubject.next(language);
      this.config.language = language;
    }
  }

}
