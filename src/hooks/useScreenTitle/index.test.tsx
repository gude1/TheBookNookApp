import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useScreenTitle } from './index';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

function TestScreen({ titleKey }: { titleKey: string }) {
  useScreenTitle(titleKey);
  return null;
}

describe('useScreenTitle', () => {
  const setOptions = jest.fn();
  const t = jest.fn((key: string) => `translated:${key}`);

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useNavigation).mockReturnValue({ setOptions } as never);
    jest.mocked(useTranslation).mockReturnValue({ t } as never);
  });

  it('sets the translated screen title on mount', () => {
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<TestScreen titleKey="navigation.browse" />);
    });

    expect(t).toHaveBeenCalledWith('navigation.browse');
    expect(setOptions).toHaveBeenCalledWith({
      title: 'translated:navigation.browse',
      tabBarLabel: 'translated:navigation.browse',
    });
  });

  it('updates the title when the key changes', () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <TestScreen titleKey="navigation.browse" />,
      );
    });

    ReactTestRenderer.act(() => {
      renderer.update(<TestScreen titleKey="navigation.cart" />);
    });

    expect(setOptions).toHaveBeenLastCalledWith({
      title: 'translated:navigation.cart',
      tabBarLabel: 'translated:navigation.cart',
    });
  });
});
