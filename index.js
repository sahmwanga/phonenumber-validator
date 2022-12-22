'use strict';

const { parsePhoneNumberFromString } = require('libphonenumber-js');

/**
 * Function used to crean mobile number
 * @param {string} msisdn
 */

exports.trimMsisdn = (msisdn) => {
  try {
    msisdn = msisdn
      .toString()
      .replace(/\s+/g, '')
      .replace(/\-/g, '')
      .replace(/\^/g, '')
      .replace(/\_/g, '')
      .replace(/[#_+-]/g, '')
      .replace(/[{()}]/g, '');

    msisdn = msisdn.toString().match(/^\+/) ? msisdn : '+' + msisdn;
    const PhoneNumber = parsePhoneNumberFromString(msisdn);

    if (PhoneNumber) {
      return PhoneNumber.number.replace(/[#_+-]/g, '');
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Check if mobile number is valid
 * @param {string} msisdn
 * @returns {boolean} true|false
 */
exports.isValidMsisdn = (msisdn) => {
  if (msisdn) {
    msisdn = msisdn.toString();

    // this validation is specifically to new airtel number;
    if(msisdn.startsWith(25530) && msisdn.length==15){
      return true;
    }
    
    const phoneObj = parsePhoneNumberFromString(
      msisdn.match(/^\+/) ? msisdn : '+' + msisdn
    );
    if (phoneObj) {
      if (phoneObj.isValid()) return phoneObj.isValid();
      return false;
    }
    return false;
  }
  return false;
};

/**
 * Return all Valid number
 * @param {Object[]} arrContacts array of contacts
 * @param {Object} arrContacts.dest_addr mobile number eg 255653679553
 */
exports.getValidContacts = (arrContacts) =>
  Promise.resolve(
    arrContacts.filter((phone) =>
      [phone].find((mob) =>
        this.isValidMsisdn(this.trimMsisdn(mob.dest_addr)) ? phone : null
      )
    )
  );

/**
 * Used to remove space on mobile number
 * @param {Object[]} arrContacts array of contacts
 * @param {Object} arrContacts.dest_addr mobile number eg 255653679553
 */
exports.getRemoveSpace = (arrContacts) =>
  arrContacts.reduce((acc, item, index) => {
    item.dest_addr = this.trimMsisdn(item.dest_addr);
    acc.push(item);
    return acc;
  }, []);

/**
 * Used to get all invalid contacts
 * @param {Object[]} arrContacts array of contacts
 * @param {Object} arrContacts.dest_addr mobile number eg 255653679553
 */
exports.getInvalidContacts = (arrContacts) =>
  Promise.resolve(
    arrContacts.filter((phone) =>
      [phone].find((mob) =>
        !this.isValidMsisdn(this.trimMsisdn(mob.dest_addr)) ? phone : null
      )
    )
  );
/**
 * used to remove Duplicates contacts from array of numbers
 * @param {Object[]} arrContacts array of contacts
 * @param {Object} arrContacts.dest_addr mobile number eg 255653679553
 */
exports.removeDuplicateContacts = (arrContacts) =>
  Promise.resolve(
    arrContacts.filter(
      (contact, index, self) =>
        index === self.findIndex((t) => t.dest_addr === contact.dest_addr)
    )
  );

/**
 * Functions to get All duplicates contacts
 * @param {Object[]} arrContacts array of contacts
 * @param {Object} arrContacts.dest_addr mobile number eg 255653679553
 */
exports.getDuplicateContacts = (arrContacts) =>
  Promise.resolve(
    arrContacts
      .map((data) => data.dest_addr)
      .reduce(function (acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) {
          acc.push(el);
        }
        return acc;
      }, [])
  );

/**
 * Get Mobile number prefix
 * @param {string} number - mobile number
 */
exports.getPrefix = (number) => {
  const callingCode = parsePhoneNumberFromString(
    number.toString().match(/^\+/) ? number : '+' + number
  ).countryCallingCode;
  return (
    callingCode +
    this.trimMsisdn(number).substring(callingCode.length).substring(0, 2)
  );
};
