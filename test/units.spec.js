const { getPrefix, isValidMsisdn, trimMsisdn } = require('../index');

describe('Test for number validation', () => {
  describe('Number prefix', () => {
    test('get number prefix', () => {
      expect(getPrefix(255653679553)).toBe('25565');
    });
  });

  describe('Is Valid phone number', () => {
    test('Test valid phone number', () => {
      expect(isValidMsisdn('255653679553')).toBeTruthy();
      expect(isValidMsisdn('255 653 679 553')).toBeTruthy();
    });

    test('Test valid phone number', () => {
      expect(isValidMsisdn('')).not.toBeTruthy();
      expect(isValidMsisdn('0653679553')).not.toBeTruthy();
    });
  });

  describe('Trim phone number', () => {
    test('Test valid number without space', () => {
      expect(trimMsisdn('255653679553')).toEqual('255653679553');
    });

    test('Test valid number with space', () => {
      expect(trimMsisdn('255 653 679 553')).toEqual('255653679553');
    });
  });
});
