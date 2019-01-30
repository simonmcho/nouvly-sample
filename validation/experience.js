const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};
    
    // title, company, from
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Backend Validator code error: Job title field is required!';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Backend Validator code error: Company title field is required!';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'Backend Validator code error: From field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}