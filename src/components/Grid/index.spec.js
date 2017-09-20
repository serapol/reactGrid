import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

const mockData = {
  columns: [
    {header: 'User Name', field: 'user'},
    {header: 'Phone', field: 'phone'},
    {header: 'E-mail', field: 'email'},
  ],

  rows: [
    {user: 'Sergey', phone: 111213123, email: 'test@test.com'}
  ]
};

import Grid from '../../components/Grid';

describe('<Grid />', () => {
  it('contains a <Grid/> element', function () {
    expect(mount(<Grid data={mockData}/>).exists()).to.equal(true);
  });

  it('contains a <TableHeader/> element with correct data', function () {
    const wrapper = mount(<Grid data={mockData}/>);
    const headerCells = wrapper.find('thead th');

    expect(headerCells.everyWhere(
      (node, index) => node.text() === mockData.columns[index].header
    )).to.equal(true);
  });

  it('contains a <TableBody/> element with correct data', function () {
    const wrapper = mount(<Grid data={mockData}/>);
    const headerRows = wrapper.find('tbody tr');

    headerRows.forEach((rowNode, rowIndex) => {
      const rowData = mockData.rows[rowIndex];
      expect(rowNode.find('td').everyWhere((cellNode, cellIndex) => {
        const fieldName = mockData.columns[cellIndex].field;

        return cellNode.text() === rowData[fieldName];
      }));
    });
  });
});
