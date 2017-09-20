import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Button from '../../components/Button';

describe('<Button />', () => {
  it('contains a <Button/> element', function () {
    expect(shallow(<Button/>).exists()).to.equal(true);
  });

  it('contains an extra class after change type', function () {
    expect(shallow(<Button type="primary"/>).hasClass('btn-primary')).to.equal(true);
  });

  it('contains an extra class after change size', function () {
    expect(shallow(<Button size="lg"/>).hasClass('btn-lg')).to.equal(true);
  });

  it('should run callback function after click', function () {
    const callback = sinon.spy();
    const wrapper = mount(<Button onClick={callback}/>);
    wrapper.simulate('click');
    expect(callback.called).to.equal(true);
  });
});
