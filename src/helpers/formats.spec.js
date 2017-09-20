import { expect } from 'chai';

import { formatPhone } from '../helpers/formats';

describe('Formats helper', () => {
  it('phone should be formatted', function () {
    expect(formatPhone('1234567895')).to.equal('123-456-7895');
  });

  it('phone should not be formatted', function () {
    expect(formatPhone('12345678')).to.equal('12345678');
  });
});
