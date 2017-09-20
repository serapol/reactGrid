import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TableRow from '../../../components/Table/Row';

describe('<TableRow />', () => {
  it('contains a <TableRow/> element', function () {
    expect(shallow(<TableRow>Test</TableRow>).exists()).to.equal(true);
  });

  it('contains a children elements', function () {
    expect(shallow(<TableRow><span>Test</span></TableRow>).find('span').text()).to.equal('Test');
  });
});
