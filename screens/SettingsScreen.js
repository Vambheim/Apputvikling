import React, {useState, useEffect} from 'react';
import {
  View,
  Switch,
  StyleSheet,
  Button,
  SafeAreaView,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../localizations/I18n';
import {Margin} from '@mui/icons-material';

const DARK_MODE_KEY = 'DARK_MODE_KEY';
const THEME_KEY = 'THEME_KEY';

const lightColors = {
  background: '#fff',
  text: '#000',
};

const darkColors = {
  background: '#000',
  text: '#fff',
};

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [colors, setColors] = useState(lightColors);

  useEffect(() => {
    const loadDarkMode = async () => {
      const savedDarkMode = await AsyncStorage.getItem(DARK_MODE_KEY);
      setDarkMode(savedDarkMode === 'true');
    };

    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      setColors(savedTheme === 'dark' ? darkColors : lightColors);
    };

    loadDarkMode();
    loadTheme();
  }, []);

  const toggleDarkMode = async value => {
    setDarkMode(value);
    await AsyncStorage.setItem(DARK_MODE_KEY, value.toString());
    setColors(value ? darkColors : lightColors);
    await AsyncStorage.setItem(THEME_KEY, value ? 'dark' : 'light');
  };

  const commitLanguageChange = async language => {
    try {
      await AsyncStorage.setItem('language', language);
      i18n.locale = language;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={{...styles.content}}>
        <Text
          style={{
            color: colors.text,
            fontFamily: 'Avenir',
            margin: 10,
            fontSize: 20,
          }}>
          {i18n.t('Changetheme')}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={darkMode ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
        <View style={{margin: 40, justifyContent: 'flex-start'}}>
          <Text
            style={{
              color: colors.text,
              fontFamily: 'Avenir',
              margin: 10,
              fontSize: 20,
              textAlign: 'center',
            }}>
            {i18n.t('Changelanguage')}
          </Text>
          <Button
            style={{
              color: colors.text,
              fontFamily: 'Avenir',
              margin: 10,
              fontSize: 20,
            }}
            title="English"
            onPress={() => commitLanguageChange('en')}
          />
          <Button title="Norsk" onPress={() => commitLanguageChange('nb')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;

//
