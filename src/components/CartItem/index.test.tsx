import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import type { CartItem as CartItemType } from '@/types/cart.types';

import { CartItem } from './index';

const mockItem: CartItemType = {
  book: {
    id: 'book-1',
    title: 'The Silent Garden',
    author: 'Jane Austen',
    description: 'A captivating story.',
    price: 12.99,
    coverUrl: 'https://example.com/book-1.jpg',
    rating: 4.5,
    reviewCount: 120,
  },
  quantity: 2,
};

describe('CartItem', () => {
  it('renders book details and line total', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <CartItem
          item={mockItem}
          onDecrement={jest.fn()}
          onIncrement={jest.fn()}
          onRemove={jest.fn()}
        />,
      );
    });

    const json = JSON.stringify(tree!.toJSON());
    expect(json).toContain('The Silent Garden');
    expect(json).toContain('Jane Austen');
    expect(json).toContain('25.98');
  });

  it('calls cart actions from the quantity and remove controls', async () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const onRemove = jest.fn();
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <CartItem
          item={mockItem}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          onRemove={onRemove}
        />,
      );
    });

    const buttons = tree!.root.findAll(
      (node) => node.props?.accessibilityRole === 'button',
    );

    const decrementButton = buttons.find(
      (button) => button.props?.accessibilityLabel === 'Decrease quantity',
    );
    const incrementButton = buttons.find(
      (button) => button.props?.accessibilityLabel === 'Increase quantity',
    );

    await ReactTestRenderer.act(() => {
      decrementButton!.props.onPress();
    });
    expect(onDecrement).toHaveBeenCalledWith('book-1');

    await ReactTestRenderer.act(() => {
      incrementButton!.props.onPress();
    });
    expect(onIncrement).toHaveBeenCalledWith('book-1');

    const removeButton = buttons.find(
      (button) => button.props?.accessibilityLabel === 'Remove',
    );

    await ReactTestRenderer.act(() => {
      removeButton!.props.onPress();
    });
    expect(onRemove).toHaveBeenCalledWith('book-1');
  });
});
