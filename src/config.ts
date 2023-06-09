import { InjectionToken } from "@angular/core";

export const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>('config');

export const APP_CONFIG: AppConfig = {
    pageElement: 5,
    dataSourceURL: 'https://fakestoreapi.com/products',
    language: 'en',
    countriesSourceURL: 'https://restcountries.com/v3.1/all?fields=name',
    getDataSourceURL: getSourceURL
};

export interface AppConfig {
   pageElement: number,
   dataSourceURL: string,
   language: 'en' | 'fr'
   countriesSourceURL: string,
   getDataSourceURL(language: 'en' | 'fr'): string
}

function getSourceURL(language: 'en' | 'fr'): string {
    return language === 'en' ? 'https://fakestoreapi.com/products' : './assets/json/products-fr.json'
}