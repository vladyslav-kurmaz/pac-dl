import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import i18nConfig from '@/i18nConfig';

import i18next from 'i18next';

export default async function initTranslations(
  locale: any,
  namespaces: any,
  i18nInstance?: any,
  resources?: any
) {
  
  i18nInstance = i18nInstance || createInstance();
  i18nInstance.use(initReactI18next);  

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }  

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  };
}


// import i18n from 'i18next';
// import Backend from 'i18next-http-backend';
// // import LanguageDetector from 'i18next-browser-languagedetector';
// // import { initReactI18next } from 'react-i18next';


//  i18next
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next) // bind react-i18next to the instance
//   .init({
//     fallbackLng: 'en',
//     debug: true,

//     interpolation: {
//       escapeValue: false, // not needed for react!!
//     },

   
//   });
  