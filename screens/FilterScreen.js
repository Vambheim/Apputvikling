import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import i18n from '../localizations/I18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dark mode key
const DARK_MODE_KEY = 'DARK_MODE_KEY';

// Light color Scheme
const lightColors = {
  background: '#F4F2F3',
  text: '#000',
};

// Dark color scheme
const darkColors = {
  background: '#000',
  text: '#F4F2F3',
};

// List of countries
const countries = ['USA', 'Japan', 'Italy'];

const FiltersScreen = ({navigation}) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [sellerInfoFilter, setSellerInfoFilter] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const colors = darkMode ? darkColors : lightColors;

  // Use dark mode
  useEffect(() => {
    const loadDarkMode = async () => {
      const savedDarkMode = await AsyncStorage.getItem(DARK_MODE_KEY);
      setDarkMode(savedDarkMode === 'true');
    };

    loadDarkMode();
  }, []);

  const toggleCountry = country => {
    setSelectedCountries(prevCountries =>
      prevCountries.includes(country)
        ? prevCountries.filter(c => c !== country)
        : [...prevCountries, country],
    );
  };

  const applyFilters = () => {
    const filters = {
      countries: selectedCountries,
      sellerInfo: sellerInfoFilter.trim(),
    };

    navigation.navigate('HomePage', {filters});
  };

  const clearFilters = () => {
    setSelectedCountries([]);
    setSellerInfoFilter('');
    navigation.navigate('HomePage', {filters: {}}); // Pass empty filters to clear on HomeScreen
  };

  return (
    <View style={{...styles.container, backgroundColor: colors.background}}>
      {countries.map(country => (
        <TouchableOpacity
          key={country}
          style={{
            ...styles.button,
            backgroundColor: selectedCountries.includes(country)
              ? '#C0A9BD'
              : colors.background,
          }}
          onPress={() => toggleCountry(country)}>
          <Text style={{color: colors.text}}>{country}</Text>
        </TouchableOpacity>
      ))}
      <TextInput
        style={styles.input}
        placeholder={i18n.t('Filter2')}
        placeholderTextColor={colors.text}
        value={sellerInfoFilter}
        onChangeText={setSellerInfoFilter}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            color={'#C0A9BD'}
            title={i18n.t('Applyfilter')}
            onPress={applyFilters}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            color={'#C0A9BD'}
            title={i18n.t('Removefilter')}
            onPress={clearFilters}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    borderColor: '#C0A9BD',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    borderColor: '#C0A9BD',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    overflow: 'hidden',
  },
  buttonWrapper: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C0A9BD',
    margin: 5,
    overflow: 'hidden',
  },
});

export default FiltersScreen;
