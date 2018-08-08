const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    const thresholdForName = { min: 2, max: 30 };
    const thresholdForPassword = { min: 6, max: 30 };
    // If data.name is not empty, it's its own value. 
    // If not, make it empty string so we can use Validator.isEmpty(str)
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

    console.log(data);
    // If validator requirements don't match, create a key in errors called name with a value
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required!';
    }
    if (!Validator.isLength(data.name, thresholdForName)) {
        errors.nameLength = 'Name must be between 2 and 30 characters!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }
    if (!Validator.isEmail(data.email)) {
        errors.emailValid = 'Email is invalid!';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }
    if (!Validator.isLength(data.password, thresholdForPassword)) {
        errors.passwordLength = 'Password must be between 6 and 30 characters!';
    }
    if (Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Password Confirm field is required!';
    }
    if (!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Passwords must match!';
    }

    return {
        errors, // errors will be empty if valid
        isValid: isEmpty(errors) // If errors is empty, then it's valid!
    }
}