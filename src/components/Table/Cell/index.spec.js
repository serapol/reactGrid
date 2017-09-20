import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TableCell from '../../../components/Table/Cell';

describe('<TableCell />', () => {
  it('contains a <TableCell/> element', function () {
    expect(shallow(<TableCell>Test</TableCell>).exists()).to.equal(true);
  });

  it('contains a children elements', function () {
    expect(shallow(<TableCell><span>Test</span></TableCell>).find('span').text()).to.equal('Test');
  });

  it('should be "th" if isHeader is true', function () {
    expect(shallow(<TableCell isHeader={true}/>).is('th')).to.equal(true);
  });
});
