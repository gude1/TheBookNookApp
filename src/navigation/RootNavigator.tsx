import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  BookDetailsScreen,
  BrowseScreen,
  CartScreen,
  CheckoutScreen,
} from '@/screens';

import { sharedScreenOptions } from './screenOptions';
import { BrowseTabIcon, CartTabIcon } from './tabBarIcons';

const MainTabs = createBottomTabNavigator({
  screenOptions: sharedScreenOptions,
  screens: {
    Browse: {
      screen: BrowseScreen,
      options: {
        tabBarIcon: BrowseTabIcon,
      },
    },
    Cart: {
      screen: CartScreen,
      options: {
        tabBarIcon: CartTabIcon,
      },
    },
  },
});

export const RootStack = createNativeStackNavigator({
  screenOptions: sharedScreenOptions,
  screens: {
    MainTabs: {
      screen: MainTabs,
      options: {
        headerShown: false,
      },
    },
    BookDetails: BookDetailsScreen,
    Checkout: CheckoutScreen,
  },
});

export const Navigation = createStaticNavigation(RootStack);
