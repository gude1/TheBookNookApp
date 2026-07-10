import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import { useLanguageStore } from '@/store';

import { LanguageSwitcher } from './index';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    useLanguageStore.setState({ language: 'en' });
  });

  it('renders the current language in the select trigger', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<LanguageSwitcher />);
    });

    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('English');
    expect(json).toContain('chevron-down');
  });

  it('renders a compact select for the header variant', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<LanguageSwitcher variant="header" />);
    });

    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('English');

    const visibleLabels = tree!.root.findAll(
      (node) => node.type === 'Text' && node.props?.children === 'Language',
    );
    expect(visibleLabels).toHaveLength(0);
  });

  it('switches language when an option is selected from the dropdown', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<LanguageSwitcher />);
    });

    const trigger = tree!.root.find(
      (node) => node.props?.accessibilityState?.expanded === false,
    );

    await ReactTestRenderer.act(() => {
      trigger.props.onPress();
    });

    const spanishOption = tree!.root.find(
      (node) =>
        node.props?.accessibilityRole === 'menuitem' &&
        node.props?.accessibilityState?.selected === false,
    );

    await ReactTestRenderer.act(() => {
      spanishOption.props.onPress();
    });

    expect(useLanguageStore.getState().language).toBe('es');
  });
});
