import YesNoComponent from '@/components/YesNoComponent';
import { mount } from '@vue/test-utils';
import sinon from 'sinon';

it('Click on yes button calls our method with argument "yes"', async () => {
  const spy = sinon.spy();
  const wrapper = mount(YesNoComponent, {
    propsData: {
      callMe: spy,
    },
  });
  await wrapper.find('button.yes').trigger('click');

  expect(spy.calledWith('yes')).toBeTruthy();
});
