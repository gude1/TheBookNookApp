import { StyleSheet, Text, type TextStyle } from 'react-native';

type BookPriceProps = {
  price: number;
  style?: TextStyle;
};

export function BookPrice({ price, style }: BookPriceProps) {
  return <Text style={[styles.price, style]}>{`$${price.toFixed(2)}`}</Text>;
}

const styles = StyleSheet.create({
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
});
