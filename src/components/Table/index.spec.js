import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Table from '../../components/Table';

describe('<Table />', () => {
  it('contains a <Table/> element', function () {
    expect(shallow(<Table>Test</Table>).exists()).to.equal(true);
  });

  it('contains an extra class when bordered is true', function () {
    expect(shallow(<Table bordered={true}>Test</Table>).hasClass('table-bordered')).to.equal(true);
  });

  it('contains an extra class when condensed is true', function () {
    expect(shallow(<Table condensed={true}>Test</Table>).hasClass('table-condensed')).to.equal(true);
  });

  it('contains an extra class when hover is true', function () {
    expect(shallow(<Table hover={true}>Test</Table>).hasClass('table-hover')).to.equal(true);
  });

  it('contains an extra class when striped is true', function () {
    expect(shallow(<Table striped={true}>Test</Table>).hasClass('table-striped')).to.equal(true);
  });

  it('contains an responsive wrapper when responsive is true', function () {
    const wrapper = shallow(<Table responsive={true}>Test</Table>);
    expect(wrapper.hasClass('table-responsive')).to.equal(true);
    expect(wrapper.find('table').length).to.equal(1);
  });
});
