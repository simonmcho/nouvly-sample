const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) errors.email = "Login Checker says: Email is not valid.";
    if (Validator.isEmpty(data.email)) errors.email = "Login Checker says: Please enter an email to login.";
    if (Validator.isEmpty(data.password)) errors.password = "Login Checker says: Please enter a password to login.";

    return {
        errors,
        isValid: isEmpty(errors)
    }

}