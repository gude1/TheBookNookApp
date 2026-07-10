import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import { SearchInput } from './index';

describe('SearchInput', () => {
  it('renders the placeholder and search icon', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <SearchInput
          onChangeText={jest.fn()}
          onClear={jest.fn()}
          placeholder="Search by title or author"
          value=""
        />,
      );
    });

    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('Search by title or author');
    expect(json).toContain('search-outline');
  });

  it('shows the clear button when there is text', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <SearchInput
          clearAccessibilityLabel="Clear search"
          onChangeText={jest.fn()}
          onClear={jest.fn()}
          placeholder="Search"
          value="jane"
        />,
      );
    });

    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('close-circle');
  });

  it('calls onClear when the clear button is pressed', async () => {
    const onClear = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <SearchInput
          clearAccessibilityLabel="Clear search"
          onChangeText={jest.fn()}
          onClear={onClear}
          placeholder="Search"
          value="jane"
        />,
      );
    });

    const clearButton = tree!.root.find(
      (node) => node.props?.accessibilityLabel === 'Clear search',
    );

    await ReactTestRenderer.act(() => {
      clearButton.props.onPress();
    });

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
