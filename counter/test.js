import { mount } from '@vue/test-utils';
import Counter from './counter';

const wrapper = mount(Counter);

const vm = wrapper.vm;

console.log(wrapper);

describe('Counter', () => {
    const wrapper = mount(Counter);

    it('renders the correnct markups', () => {
        expect(wrapper.html()).toContain('<span class="count">0</span>');
    });

    it('has a button', () => {
        expect(wrapper.contains('button')).toBe(true);
    });

    it('button click should increment the count', () => {
        expect(wrapper.vm.count).toBe(0);
        const button = wrapper.find('button');
        button.trigger('click');
        expect(wrapper.vm.count).toBe(1);
    });
});
