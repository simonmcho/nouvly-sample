const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 1, max: 5000})) {
        errors.text = 'Post checker says: Post must be between 1 to 5000 characters!';
    }

    if (Validator.isEmpty(data.text)) errors.text = 'Post Checker says: Text field is required!';

    return {
        errors,
        isValid: isEmpty(errors)
    }

}