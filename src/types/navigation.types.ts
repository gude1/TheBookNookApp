import type { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

export type MainTabParamList = {
  Browse: undefined;
  Cart: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  BookDetails: { bookId: string };
  Checkout: undefined;
};

export type BookDetailsRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
