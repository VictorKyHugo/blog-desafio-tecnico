import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Card from '../CardComponent.vue';

describe('Card', () => {
  it('should emit onReadMore when clicked', async () => {
    const wrapper = mount(Card, {
      props: {
        author: 'Nome Pessoa',
        authorId: 1,
        postId: 1
      }
    });

    const cardWrapper = wrapper.find('[data-test="card"]');
    await cardWrapper.trigger('click');

    expect(wrapper.emitted('onReadMore')).toBeTruthy();
  });

  it('should have isCompact class if isCompact prop is true', async () => {
    const wrapper = mount(Card, {
      props: {
        author: 'Nome Pessoa',
        authorId: 1,
        postId: 1,
        isCompact: true
      }
    });

    const cardWrapper = wrapper.find('[data-test="card"]');

    expect(cardWrapper.classes()).toContain('isCompact');
  });

  it('should NOT have isCompact class if isCompact prop is true', async () => {
    const wrapper = mount(Card, {
      props: {
        author: 'Nome Pessoa',
        authorId: 1,
        postId: 1,
        isCompact: false
      }
    });

    const cardWrapper = wrapper.find('[data-test="card"]');

    expect(cardWrapper.classes()).not.toContain('isCompact');
  });
});
