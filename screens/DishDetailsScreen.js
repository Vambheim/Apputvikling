import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  SectionList,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import DetailsCard from '../components/DetailsCard';
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

const DishDetailsScreen = ({route}) => {
  const {dishId} = route.params;

  const [details, setDetails] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null); // Store selected dish details

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

  const addToShoppingCart = async () => {
    // Call the api
    const response = await fetch('http://localhost:3000/shoppingcart', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedDish),
    });
  };

  const addToBookmarks = async () => {
    // Call the api
    const response = await fetch('http://localhost:3000/bookmarks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedDish),
    });
  };
  // Retrieves details for an individual dish
  const getDishDetails = async () => {
    const response = await fetch(`http://localhost:3000/dishes/${dishId}`);
    const dishDetails = await response.json();
    setDetails(Array.isArray(dishDetails) ? dishDetails : [dishDetails]);
    // Store spesific details for the dish in order to let addToShoppingCart access
    setSelectedDish(dishDetails);
  };
  useEffect(() => {
    getDishDetails();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
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
          {details.map(detail => (
            <DetailsCard
              key={detail.id}
              name={detail.name}
              address={detail.address}
              price={detail.price}
              sellerinfo={detail.sellerinfo}
              data={detail.data} // Pass the 'data' array containing ingredients and allergens directly as a prop
              image={detail.image}
              onAddToCart={addToShoppingCart}
              onAddToBookmarks={addToBookmarks}
            />
          ))}
        </View>
        <View
          style={{
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DishDetailsScreen;

const styles = StyleSheet.create({
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
    margin: 20,
    overflow: 'hidden',
  },
});
