# PHONE NUMBER VALIDATOR

Phonenumber validator is phone number validating and parsing library.

## Installation

---

via **npm**

```
npm install bl-phonenumber-validator --save
```

via **yarn**

```
yarn add bl-phonenumber-validator
```

## Use

---

### Get Prefix

```
import { getPrefix } from bl-phonenumber-validator

const prefix = getPrefix('255653679553')
    .then( (prefix) => console.log( prefix ) )
    .catch( (error) => { throw error })
```

### Validate phone number

```
import { isValidMsisdn } from bl-phonenumber-validator

const prefix = isValidMsisdn('255653679553')
    .then( (prefix) => {
        // output 'true'
    } )
    .catch( (error) => { throw error })
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
