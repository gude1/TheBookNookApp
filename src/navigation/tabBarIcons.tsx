import { Ionicons } from '@react-native-vector-icons/ionicons/static';

type TabIconProps = {
  color: string;
  size: number;
};

export function BrowseTabIcon({ color, size }: TabIconProps) {
  return <Ionicons color={color} name="book-outline" size={size} />;
}

export function CartTabIcon({ color, size }: TabIconProps) {
  return <Ionicons color={color} name="cart-outline" size={size} />;
}
