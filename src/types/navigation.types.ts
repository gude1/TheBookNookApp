import type { RouteProp } from '@react-navigation/native';

export type MainTabParamList = {
  Browse: undefined;
  Cart: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  BookDetails: { bookId: string };
  Checkout: undefined;
};

export type BookDetailsRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
