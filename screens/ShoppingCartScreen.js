import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import ShoppingCartCard from '../components/ShoppingCartCard';
import RecommendationCard from '../components/RecommendationCard';
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

const ShoppingCartScreen = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

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
    // Call the API to fetch shopping cart items
    const response = await fetch('http://localhost:3000/shoppingcart');
    const itemsData = await response.json();

    // Set the original price for each item
    const itemsWithOriginalPrice = itemsData.map(item => ({
      ...item,
      originalPrice: parseFloat(item.price), // Assuming price is available in the fetched data
    }));

    setItems(itemsWithOriginalPrice);

    getItemsByCountry();
  };

  // Filter functionality
  const getItemsByCountry = async () => {
    const uniqueCountries = Array.from(
      new Set(items.map(item => item.country)),
    );

    const countryBasedRecommendations = await Promise.all(
      uniqueCountries.map(async country => {
        const response = await fetch(
          `http://localhost:3000/dishes?country=${country}`,
        );
        const recommendations = await response.json();
        return recommendations;
      }),
    );

    // Flatten the array of arrays into a single array of recommendations
    const mergedRecommendations = countryBasedRecommendations.flat();

    // Remove items already in the cart from recommendations
    const cartItemIds = items.map(item => item.id);
    const filteredRecommendations = mergedRecommendations.filter(
      recommendation => {
        return !items.some(item => item.id === recommendation.id);
      },
    );

    setRecommendations(filteredRecommendations);
  };

  // Update items each time shopping cart is highlighted to retrieve newly added items
  useEffect(() => {
    const refreshCart = navigation.addListener('focus', () => {
      getItems();
    });

    return refreshCart;
  }, [navigation]);

  const updatePrice = (itemId, newPrice) => {
    // Update the price for the specific item with itemId
    const updatedItems = items.map(item =>
      item.id === itemId ? {...item, price: newPrice} : item,
    );
    setItems(updatedItems);
  };

  const removeFromCart = async itemId => {
    // Call the API to remove the item from the shopping cart
    await fetch(`http://localhost:3000/shoppingcart/${itemId}`, {
      method: 'DELETE',
    });
    // Update the state after removal
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);

    refreshRecommendations();
  };

  // Fetch recommendations based on items in the cart
  const refreshRecommendations = async () => {
    await getItems(); // Update the items in the cart
    // Now that items state has been updated, fetch recommendations based on updated items
    await getItemsByCountry();
  };

  const showCardItems = dishId => {
    navigation.navigate('CartDishDetails', {dishId});
  };

  // Recommender functionality:

  let totalPrice = items.reduce(
    (total, item) => total + parseFloat(item.price),
    0,
  );
  // "Purchase" functionality
  const clearCart = async () => {
    try {
      // Iterate through each item in the shopping cart and delete them one by one
      await Promise.all(
        items.map(async item => {
          const response = await fetch(
            `http://localhost:3000/shoppingcart/${item.id}`,
            {
              method: 'DELETE',
            },
          );

          if (!response.ok) {
            console.error(`Failed to delete item with ID ${item.id}`);
          }
        }),
      );

      // After all items are deleted, update the state to clear the cart
      setItems([]);
      setRecommendations([]);
      console.log('Shopping cart cleared successfully');
    } catch (error) {
      console.error('Error clearing shopping cart:', error);
    }
  };

  useEffect(() => {
    getItems(); // Fetch items initially

    const getRecommendations = async () => {
      await getItemsByCountry(); // Fetch recommendations based on items
    };

    getRecommendations(); // Fetch recommendations initially

    // Refresh recommendations whenever items change
    const refreshRecommendationsOnItemsChange = async () => {
      await getRecommendations();
    };

    refreshRecommendationsOnItemsChange();

    return refreshRecommendationsOnItemsChange; // Clean up on unmount
  }, [items]); // Trigger when items change

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
            {i18n.t('Shoppingcart')}
          </Text>
        </View>
        {items.map(item => (
          <View key={item.id}>
            <ShoppingCartCard
              key={`cart-${item.id}`} // Unique key for ShoppingCartCard
              displayText={item.name}
              price={parseFloat(item.price)}
              originalPrice={item.originalPrice} // Assuming original price is available in the fetched data
              updatePrice={newPrice => updatePrice(item.id, newPrice)}
              showItems={() => showCardItems(item.id)}
              image={item.image}
            />
            <Pressable
              key={`pressable-${item.id}`} // Unique key for Pressable
              onPress={() => removeFromCart(item.id)}
              style={{
                ...styles.removeButton,
                width: '95%',
                backgroundColor: colors.background,
              }}>
              <Text style={{fontFamily: 'Avenir', color: colors.text}}>
                {i18n.t('Remove')}
              </Text>
            </Pressable>
          </View>
        ))}
        <View style={{margin: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Avenir',
              color: colors.text,
            }}>
            {i18n.t('Totalprice')}: {totalPrice.toFixed(2) + ',-'}
          </Text>
        </View>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Pressable
            onPress={clearCart}
            style={{
              backgroundColor: colors.background,
              borderColor: colors.text,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Text style={{fontFamily: 'Avenir', color: colors.text}}>
              {i18n.t('Purchase')}
            </Text>
          </Pressable>
        </View>
        <View style={{margin: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Avenir',
              color: colors.text,
            }}>
            {i18n.t('Youmaylike')}
          </Text>
          {recommendations.map(recommendation => (
            <ScrollView>
              <View key={recommendation.id}>
                <RecommendationCard
                  key={`recommendation-${recommendation.id}`} // Unique key for RecommendationCard
                  displayText={recommendation.name}
                  price={parseFloat(recommendation.price)}
                  originalPrice={recommendation.originalPrice}
                  image={recommendation.image}
                  updatePrice={newPrice =>
                    updatePrice(recommendation.id, newPrice)
                  }
                  showItems={() => showCardItems(recommendation.id)}
                />
              </View>
            </ScrollView>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Forslag til fonts: Avenir, Gill Sans

const styles = StyleSheet.create({
  removeButton: {
    backgroundColor: '#F4F2F3',
    borderColor: '#C0A9BD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  totalPriceContainer: {
    margin: 20,
  },
  // Add more styles as needed
});
export default ShoppingCartScreen;
