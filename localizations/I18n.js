import {I18n} from 'i18n-js';
import translations from './translations.json';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const locales = RNLocalize.getLocales();

const retrieveSelectedLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem('language');
    return value;
  } catch (error) {
    return null;
  }
};

// configure i18n
const i18n = new I18n({...translations});
i18n.locale = locales[0].languageCode;

const setLanguage = async () => {
  const selectedLanguage = await retrieveSelectedLanguage();
  i18n.locale = selectedLanguage;
};

setLanguage();

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;
