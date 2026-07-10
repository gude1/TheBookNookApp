import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import { BookPrice } from './index';

describe('BookPrice', () => {
  it('formats whole-dollar prices with two decimal places', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<BookPrice price={12} />);
    });

    const textNode = tree!.root.findByType('Text');
    expect(textNode.props.children).toBe('$12.00');
  });

  it('formats fractional prices', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(<BookPrice price={9.99} />);
    });

    const textNode = tree!.root.findByType('Text');
    expect(textNode.props.children).toBe('$9.99');
  });
});
