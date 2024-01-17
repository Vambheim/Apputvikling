import React, {useState} from 'react';
import i18n from './localizations/I18n';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import DishDetailsScreen from './screens/DishDetailsScreen';
import {HeaderBackButton} from '@react-navigation/elements';
import BookmarksScreen from './screens/BookmarksScreen';
import SettingsScreen from './screens/SettingsScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import {Book, Bookmark} from '@mui/icons-material';
import FiltersScreen from './screens/FilterScreen';
import {Image} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// HomeStack
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: '#C0A9BD',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomePage"
        component={HomeScreen} // Use component instead of specifying the name
      />
      <Stack.Screen
        name="DishDetails"
        component={DishDetailsScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: i18n.t('Back'),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor="#C0A9BD"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: i18n.t('Back'),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor="#C0A9BD"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

// ShoppingCartStack
function ShoppingCartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: '#C0A9BD',
      }}>
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
        })}
      />
      <Stack.Screen
        name="CartDishDetails"
        component={DishDetailsScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: i18n.t('Back'),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor="#C0A9BD"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

// BookmarksStack
function BookmarksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: '#C0A9BD',
      }}>
      <Stack.Screen
        name="BookmarksPage"
        component={BookmarksScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
        })}
      />
      <Stack.Screen
        name="BookmarkDishDetails"
        component={DishDetailsScreen}
        options={({navigation}) => ({
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: i18n.t('Back'),
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor="#C0A9BD"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#F4F2F3',
          tabBarStyle: {backgroundColor: '#C0A9BD'},
        }}>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./images/Home.png')}
                style={{tintColor: color, width: size, height: size}}
              />
            ),
          }}
          name={i18n.t('Home')}
          component={HomeStack}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./images/Shoppingcart.png')}
                style={{tintColor: color, width: size, height: size}}
              />
            ),
          }}
          name={i18n.t('Shoppingcart')}
          component={ShoppingCartStack}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./images/Favourite.png')}
                style={{tintColor: color, width: size, height: size}}
              />
            ),
          }}
          name={i18n.t('Bookmarks')}
          component={BookmarksStack}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./images/Settings.png')}
                style={{tintColor: color, width: size, height: size}}
              />
            ),
          }}
          name={i18n.t('Settings')}
          component={SettingsScreen}
        />

        {/* Add more screens for bottom navigation as needed */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;

{
}
