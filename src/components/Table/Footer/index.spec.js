import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TableFooter from '../../../components/Table/Footer';

describe('<TableFooter />', () => {
  it('contains a <TableFooter/> element', function () {
    expect(shallow(<TableFooter>Test</TableFooter>).exists()).to.equal(true);
  });

  it('contains a children elements', function () {
    expect(shallow(<TableFooter><span>Test</span></TableFooter>).find('span').text()).to.equal('Test');
  });
});
