import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  Text,
  SectionList,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import Card from '../components/Card';
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
  text: '#fff',
};

const HomeScreen = ({navigation, route}) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
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

  const showCardItems = dishId => {
    navigation.navigate('DishDetails', {dishId});
  };

  const showFilters = () => {
    navigation.navigate('Filters');
  };

  const getDishes = async () => {
    // call api
    const response = await fetch('http://localhost:3000/dishes');
    const dishes = await response.json();
    setItems(dishes);
    setFilteredItems(dishes); // update filteredItems here
  };

  useEffect(() => {
    getDishes();
  }, []);

  const applyFilters = filters => {
    let filteredData = [...items]; // Copy original data

    if (filters.countries && filters.countries.length > 0) {
      filteredData = filteredData.filter(item =>
        filters.countries.includes(item.country),
      );
    }

    if (filters.sellerInfo) {
      filteredData = filteredData.filter(
        item => item.sellerinfo === filters.sellerInfo,
      );
    }

    setFilteredItems(filteredData);
  };
  useEffect(() => {
    if (route.params && route.params.filters) {
      applyFilters(route.params.filters);
    } else {
      // If no filters are applied, show all items
      setFilteredItems(items);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <View
        style={{
          margin: 15,
          marginLeft: '10%',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            borderColor: '#C0A9BD',
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            width: '75%',
            color: colors.text,
          }}
          placeholder={i18n.t('Search')}
          placeholderTextColor={'#C0A9BD'}
          onChangeText={newText => {
            var matchedCards = []; // apply search only if search string length >= 2
            if (newText.trim().length >= 2) {
              items.map((item, index) => {
                if (item.name.toLowerCase().includes(newText.toLowerCase())) {
                  matchedCards.push(item);
                }
              });
              setFilteredItems(matchedCards);
            } else {
              setFilteredItems(items);
            }
          }}
        />
        <Pressable onPress={showFilters}>
          <Image
            style={{
              width: 35,
              height: 35,
              marginLeft: 20,
              opacity: 0.5,
              tintColor: darkMode ? lightColors.background : undefined, // Set tintColor based on dark mode
            }}
            source={require('../images/HamburgerMenu.png')}></Image>
        </Pressable>
      </View>
      {/* Card mapping */}
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
          }}>
          {filteredItems.map((items, index) => {
            let size;
            if (index % 3 === 0) {
              size = 110; // Small
            } else if (index % 3 === 1) {
              size = 150; // Medium
            } else {
              size = 200; // Large
            }
            return (
              <Card
                size={size}
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                }}
                key={items.id}
                displayText={items.name}
                image={items.image}
                showItems={() => showCardItems(items.id)}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;
