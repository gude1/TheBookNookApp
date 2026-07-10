import '@/config';

const mockStorage = new Map();

jest.mock('react-native-bootsplash', () => ({
  __esModule: true,
  default: {
    hide: jest.fn().mockResolvedValue(undefined),
    isVisible: jest.fn().mockReturnValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: { source: 0 },
      brand: { source: 0 },
    }),
  },
}));

jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const { Image, View } = require('react-native');

  const createAnimatedComponent = (Component) => Component;

  return {
    __esModule: true,
    default: {
      View,
      Image,
      createAnimatedComponent,
    },
    View,
    Image,
    createAnimatedComponent,
    useSharedValue: (initialValue) => ({ value: initialValue }),
    useAnimatedStyle: (factory) => factory(),
    withTiming: (toValue) => toValue,
    withSequence: (...steps) => steps[steps.length - 1],
  };
});

jest.mock('@react-native-vector-icons/ionicons/static', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    Ionicons: ({ name, accessibilityLabel, ...props }) =>
      React.createElement(
        Text,
        {
          ...props,
          accessibilityLabel: accessibilityLabel ?? name,
        },
        name,
      ),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(async key => mockStorage.get(key) ?? null),
    setItem: jest.fn(async (key, value) => {
      mockStorage.set(key, value);
    }),
    removeItem: jest.fn(async key => {
      mockStorage.delete(key);
    }),
    clear: jest.fn(async () => {
      mockStorage.clear();
    }),
    getAllKeys: jest.fn(async () => [...mockStorage.keys()]),
    multiGet: jest.fn(async keys =>
      keys.map(key => [key, mockStorage.get(key) ?? null]),
    ),
    multiSet: jest.fn(async pairs => {
      pairs.forEach(([key, value]) => mockStorage.set(key, value));
    }),
    multiRemove: jest.fn(async keys => {
      keys.forEach(key => mockStorage.delete(key));
    }),
  },
}));
