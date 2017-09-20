import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Input from '../../components/Input';

describe('<Input />', () => {
  it('contains a <Input/> element', function () {
    expect(shallow(<Input/>).exists()).to.equal(true);
  });

  it('contains a input element', function () {
    expect(shallow(<Input/>).find('input').length).to.equal(1);
  });

  it('contains a input element with a specified type', function () {
    expect(shallow(<Input type="password"/>).find('input[type="password"]').length).to.equal(1);
  });

  it('contains a label when the inputLabel is set', function () {
    const wrapper = shallow(<Input inputLabel="Test label"/>);
    const label = wrapper.find('label');

    expect(label.text()).to.equal('Test label');
  });

  it('contains a .help-block when validationState and errorMessage are set such as not valid', function () {
    const wrapper = shallow(
      <Input
        validationState={'error'}
        errorMessage="Validation Error"
      />
    );
    const label = wrapper.find('.help-block');

    expect(label.text()).to.equal('Validation Error');
  });

  it('should return input dom node', function () {
    const wrapper = mount(<Input/>);
    expect(wrapper.node.getInputNode()).to.equal(wrapper.find('input').node);
  });

  it('should return input value when calling onInput callback', function () {
    const callback = sinon.spy();
    const wrapper = mount(<Input onInput={callback}/>);
    wrapper.find('input').simulate('input', {target: {value: 'test'}});
    expect(callback.calledWith('test')).to.equal(true);
  });
});
