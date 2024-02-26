'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance, Resource } from 'i18next';

// Цей компонент використовується для обгортання клієнських 
// компонентів щоб передати їм можливість робити переклад
export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: {
  children: React.ReactNode,
  locale: any,
  namespaces?: any,
  resources?: Resource
}) {  
  
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return (<I18nextProvider i18n={i18n}>{children}</I18nextProvider>);
}