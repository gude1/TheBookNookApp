import '@/config';

const mockStorage = new Map();

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
    getItem: jest.fn(async (key) => mockStorage.get(key) ?? null),
    setItem: jest.fn(async (key, value) => {
      mockStorage.set(key, value);
    }),
    removeItem: jest.fn(async (key) => {
      mockStorage.delete(key);
    }),
    clear: jest.fn(async () => {
      mockStorage.clear();
    }),
    getAllKeys: jest.fn(async () => [...mockStorage.keys()]),
    multiGet: jest.fn(async (keys) =>
      keys.map((key) => [key, mockStorage.get(key) ?? null]),
    ),
    multiSet: jest.fn(async (pairs) => {
      pairs.forEach(([key, value]) => mockStorage.set(key, value));
    }),
    multiRemove: jest.fn(async (keys) => {
      keys.forEach((key) => mockStorage.delete(key));
    }),
  },
}));
