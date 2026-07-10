import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder: string;
  accessibilityLabel?: string;
  clearAccessibilityLabel?: string;
};

export function SearchInput({
  value,
  onChangeText,
  onClear,
  placeholder,
  accessibilityLabel,
  clearAccessibilityLabel,
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Ionicons color="#666666" name="search-outline" size={18} />
      <TextInput
        accessibilityLabel={accessibilityLabel ?? placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityLabel={clearAccessibilityLabel}
          accessibilityRole="button"
          hitSlop={8}
          onPress={onClear}
          style={styles.clearButton}
        >
          <Ionicons color="#666666" name="close-circle" size={18} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    padding: 0,
  },
  clearButton: {
    padding: 2,
  },
});
