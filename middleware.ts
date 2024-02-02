import {i18nRouter} from 'next-i18n-router';
import i18nConfig from './i18nConfig';


export function middleware(reques: any) {
  return i18nRouter(reques, i18nConfig);
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};