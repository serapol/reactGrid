import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TableBody from '../../../components/Table/Body';

describe('<TableBody />', () => {
  it('contains a <TableBody/> element', function () {
    expect(shallow(<TableBody>Test</TableBody>).exists()).to.equal(true);
  });

  it('contains a children elements', function () {
    expect(shallow(<TableBody><span>Test</span></TableBody>).find('span').text()).to.equal('Test');
  });
});
