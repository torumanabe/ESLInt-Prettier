import { shallowMount } from '@vue/test-utils';
//import flushPromises from 'flush-promises'
import AsyncTest from '@/components/AsyncTest';
jest.mock('axios');

it('fetches async when a button is clicked', done => {
  const wrapper = shallowMount(AsyncTest);
  wrapper.find('button').trigger('click');
  wrapper.vm.$nextTick(() => {
    expect(wrapper.vm.value).toBe('value');
    done();
  });
});

/*
it('fetches async when a button is clicked', () => {
  const wrapper = shallowMount(AsyncTest)
  wrapper.find('button').trigger('click')
  expect(wrapper.vm.value).toBe('value')
})
*/
