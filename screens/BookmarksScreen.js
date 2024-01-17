import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, SectionList, ScrollView} from 'react-native';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../localizations/I18n';

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

const BookmarksScreen = ({navigation, route}) => {
  const [items, setItems] = useState([]);
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

  const getItems = async () => {
    // call api
    const response = await fetch('http://localhost:3000/bookmarks');
    const items = await response.json();
    setItems(items);
  };
  const showCardItems = dishId => {
    navigation.navigate('BookmarkDishDetails', {dishId});
  };

  useEffect(() => {
    getItems();
  });

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <ScrollView>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color: colors.text,
              textAlign: 'center',
              fontSize: 30,
              fontFamily: 'Avenir',
            }}>
            {i18n.t('Bookmarks')}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
          }}>
          {items.map((items, index) => {
            return (
              <Card
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
export default BookmarksScreen;
