const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    const errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status: '';
    data.skills = !isEmpty(data.skills) ? data.skills: '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Backend Validator check: Handle needs to be between 2 - 40 characters!';
    }

    if (isEmpty(data.handle)) errors.handle = 'Backend Validator check: Handle is empty!';

    if (isEmpty(data.status)) errors.status = 'Backend Validator check: Status is empty!';

    if (isEmpty(data.skills)) errors.skills = 'Backend Validator check: Skills is empty!';

    if (!isEmpty(data.website)) { // If website has value
        if(!Validator.isURL(data.website)) { // Check if website is a valid url
            errors.website = 'Backend Validator check: Not a valid URL!';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) errors.facebook = 'Backend Validator check: Not a valid URL!';
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) errors.linkedin = 'Backend Validator check: Not a valid URL!';
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) errors.instagram = 'Backend Validator check: Not a valid URL!';
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) errors.twitter = 'Backend Validator check: Not a valid URL!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}