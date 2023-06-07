import { InjectionToken } from "@angular/core";

export const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>('config');

export const APP_CONFIG: AppConfig = {
    pageElement: 5,
    dataSourceURL: './assets/json/products.json',
    language: 'en'
};

export interface AppConfig {
   pageElement: number,
   dataSourceURL: string,
   language: 'en' | 'fr'
}