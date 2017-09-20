import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TableHeader from '../../../components/Table/Header';

describe('<TableHeader />', () => {
  it('contains a <TableHeader/> element', function () {
    expect(shallow(<TableHeader>Test</TableHeader>).exists()).to.equal(true);
  });

  it('contains a children elements', function () {
    expect(shallow(<TableHeader><span>Test</span></TableHeader>).find('span').text()).to.equal('Test');
  });
});
