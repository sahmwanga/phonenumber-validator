const { getDuplicateContacts } = require('./index');

getDuplicateContacts([
  {
    dest_addr: '2559292929',
    amount: 2000,
  },
  {
    dest_addr: '2559292929',
    amount: 2000,
  },
  {
    dest_addr: '2559292921',
    amount: 2000,
  },
]).then((data) => console.log(data));
