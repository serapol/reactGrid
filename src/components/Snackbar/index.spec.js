import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Snackbar from '../../components/Snackbar';

describe('<Snackbar />', () => {
  before(function () {
    this.timer = sinon.useFakeTimers();
  });

  after(function () {
    this.timer.restore();
  });

  it('contains a <Snackbar/> element', function () {
    expect(shallow(<Snackbar/>).exists()).to.equal(true);
  });

  it('contains an extra class after change type', function () {
    expect(shallow(<Snackbar type="notice"/>).find('.snackbar').hasClass('notice')).to.equal(true);
  });

  it('contains a "show" class when "show" param is true', function () {
    expect(shallow(<Snackbar show={true}/>).find('.snackbar').hasClass('show')).to.equal(true);
  });

  it('should call an "onHide" after some duration', function () {
    const callback = sinon.spy();

    mount(
      <Snackbar
        show={true}
        autoHideDuration={400}
        onHide={callback}
      />
    );

    this.timer.tick(400);

    expect(callback.calledOnce).to.equal(true);
  });
});
