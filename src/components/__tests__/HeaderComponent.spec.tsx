import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import Header from '../HeaderComponent.vue';

const routerPushMock = vi.fn();
const routerBackMock = vi.fn();
let routeNameMock = '';

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
    back: routerBackMock
  }),
  useRoute: () => ({
    name: routeNameMock
  })
}));

describe('Header', () => {
  it('should send user to HomePage when logo is clicked', async () => {
    const wrapper = mount(Header);
    const headerLogo = wrapper.find('[data-test="logo"]');

    await headerLogo.trigger('click');

    expect(routerPushMock).toHaveBeenCalledWith('/');
  });

  it('should render Back Icon if not in Home Page', () => {
    routeNameMock = 'post';

    const wrapper = mount(Header);
    const backIcon = wrapper.find('[data-test="icon"]');

    expect(backIcon.exists()).toBeTruthy();
  });

  it('should NOT render Back Icon if not in Home Page', () => {
    routeNameMock = 'home';

    const wrapper = mount(Header);
    const backIcon = wrapper.find('[data-test="icon"]');

    expect(backIcon.exists()).toBeFalsy();
  });

  it('should call router.back() when Back Icon is clicked', async () => {
    routeNameMock = 'post';

    const wrapper = mount(Header);
    const backIcon = wrapper.find('[data-test="icon"]');

    await backIcon.trigger('click');

    expect(routerBackMock).toHaveBeenCalled();
  });
});
