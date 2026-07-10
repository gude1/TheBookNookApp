import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  BookDetailsScreen,
  BrowseScreen,
  CartScreen,
  CheckoutScreen,
} from '@/screens';

const MainTabs = createBottomTabNavigator({
  screens: {
    Browse: BrowseScreen,
    Cart: CartScreen,
  },
});

export const RootStack = createNativeStackNavigator({
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
