import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import Card from '../CardComponent.vue';

describe('Card', () => {
  it('should emit onReadMore when clicked', async () => {
    const wrapper = mount(Card, {
      props: {
        author: 'Autor Mock'
      }
    });

    const cardWrapper = wrapper.find('[data-test="card"]');
    await cardWrapper.trigger('click');

    expect(wrapper.emitted('onReadMore')).toBeTruthy();
  });
});
