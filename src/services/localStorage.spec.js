import { expect } from 'chai';
import isEqual from 'lodash/isEqual';

import localStorageService from '../services/localStorage';

const mockObject = {value1: 1, value: 2};
const mockJSONString = JSON.stringify(mockObject);
const mockLocalStorage = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('localStorage service', () => {
  it('should return a object', function () {
    window.localStorage.setItem('testKey', mockJSONString);
    expect(isEqual(mockObject, localStorageService.get('testKey'))).to.equal(true);
  });

  it('should set a JSON string', function () {
    localStorageService.set('testKey', mockObject);
    expect(window.localStorage.getItem('testKey')).to.equal(mockJSONString);
  });
});
