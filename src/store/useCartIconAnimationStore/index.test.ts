import { useCartIconAnimationStore } from '@/store/useCartIconAnimationStore';

describe('useCartIconAnimationStore', () => {
  beforeEach(() => {
    useCartIconAnimationStore.setState({ bumpCount: 0 });
  });

  it('increments bump count when triggered', () => {
    useCartIconAnimationStore.getState().triggerBump();
    useCartIconAnimationStore.getState().triggerBump();

    expect(useCartIconAnimationStore.getState().bumpCount).toBe(2);
  });

  it('resets bump count to zero', () => {
    useCartIconAnimationStore.getState().triggerBump();
    useCartIconAnimationStore.getState().resetBump();

    expect(useCartIconAnimationStore.getState().bumpCount).toBe(0);
  });
});
