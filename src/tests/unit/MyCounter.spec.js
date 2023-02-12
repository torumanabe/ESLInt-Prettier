// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils';
import MyCounter from '@/components/MyCounter.vue';

describe('MyCounter', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(MyCounter);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>');
  });

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.find('button') != null).toBe(true);
  });

  it('button should increment the count', () => {
    expect(wrapper.vm.count).toBe(0);
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.count).toBe(1);
  });
});
