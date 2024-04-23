import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import langKo from './lang.ko.json';
import langEn from './lang.en.json';
import langJa from './lang.ja.json';
import langZh from './lang.zh.json';

i18n
    .use(LanguageDetector) // 사용자 언어 탐지
    .use(initReactI18next) // i18n 객체를 react-18next에 전달
    .init({
        // for all options read: https://www.i18next.com/overview/configuration-options
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: langEn,
            },
            ko: {
                translation: langKo,
            },
            ja: {
                translation: langJa
            },
            zh: {
                translation: langZh
            }
        },
    });

// const lngs = { // 2. 언어 구분을 위한 lng 객체 생성
//     en: { nativeName: 'English' },
//     ko: { nativeName: '한국어' },
// };

export default i18n;