import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import Header from '../HeaderComponent.vue';

const routerPushMuck = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMuck
  })
}));

describe('Header', () => {
  it('should send user to HomePage when logo id clicked', async () => {
    const wrapper = mount(Header);
    const headerLogo = wrapper.find('[data-test="logo"]');

    await headerLogo.trigger('click');

    expect(routerPushMuck).toHaveBeenCalledWith('/');
  });
});
