const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // First time data.name comes in, if doesn't exist, it won't be empty string, so we need to convert
    data.name = !isEmpty(data.name) ? data.name : '' ;
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30})) {
        errors.name = 'Name must be between 2 - 30 characters!';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 - 30 characters.';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Password must match!';
    }

    if (Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors) // true if isEmpty
    }
}