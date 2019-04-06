import React from 'react'
import Enzyme,{shallow, mount, render} from 'enzyme'
import Guide from '../Guide'

import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

const setupByMount = () => {
  const wrapper = mount(<Guide visible={false} />);
  return {
    wrapper,
  };
};

it('should has audio, has not shadow and content', () => {
  const { wrapper } = setupByMount();
  expect(wrapper.state().activeIndex).toBe(0)
  expect(wrapper.find('audio').length).toBe(1);
  expect(wrapper.hasClass('guide-shadow')).toBe(false)
  expect(wrapper.hasClass('guide-content')).toBe(false)
});

it('init state', () => {
  const { wrapper } = setupByMount();
  expect(wrapper.state().activeIndex).toBe(0)
  expect(wrapper.state().arrowClass).toBe('top')
  expect(wrapper.state().playClass).toBe('audio-play')
});

it('onCancel should be called', () => {
  const onCancel = jest.fn();
  const pauseStub = jest
          .spyOn(window.HTMLMediaElement.prototype, 'pause')
          .mockImplementation(() => {});
  const wrapper = mount(<Guide onCancel={onCancel} />).instance();
  wrapper.handleSkip();
  expect(onCancel).toHaveBeenCalled()
  pauseStub.mockRestore()
});

it('onOk should be called', () => {
  const onOk = jest.fn();
  const wrapper = mount(<Guide onOk={onOk} />).instance();
  wrapper.handleOk();
  expect(onOk).toHaveBeenCalled()
});










