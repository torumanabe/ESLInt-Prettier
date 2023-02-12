import { shallowMount } from '@vue/test-utils';
import calcVue from '@/components/calc.vue';

describe('calc', () => {
  const wrapper = shallowMount(calcVue);
  it('each calc results should be correct', () => {
    (wrapper.vm.inputNumber1 = 2), (wrapper.vm.inputNumber2 = 5);
    expect(wrapper.vm.add).toBe(2 + 5);
    expect(wrapper.vm.min).toBe(2 - 5);
    expect(wrapper.vm.multi).toBe(2 * 5);
    expect(wrapper.vm.divi).toBe(2 / 5);
  });

  it('each calc results of 0 and 0 should be Not a Nunber', () => {
    (wrapper.vm.inputNumber1 = ''), (wrapper.vm.inputNumber2 = '');
    expect(wrapper.vm.add).toBe('NaN');
    expect(wrapper.vm.min).toBe('NaN');
    expect(wrapper.vm.multi).toBe('NaN');
    expect(wrapper.vm.divi).toBe('NaN');
    expect(wrapper.vm.inputError).toBe('値を入力してください');
  });

  it('division by 0 should be infinity', () => {
    (wrapper.vm.inputNumber1 = 5), (wrapper.vm.inputNumber2 = 0);
    expect(wrapper.vm.divi).toBe(Infinity);
    //expect(wrapper.vm.inputError).toBe("不正な値です");
  });

  it('click clear button should be 0', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.add).toBe(0);
    expect(wrapper.vm.min).toBe(0);
    expect(wrapper.vm.multi).toBe(0);
    expect(wrapper.vm.divi).toBe(NaN);
  });
});
