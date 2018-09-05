const Validator = require('validator');
const isEmpty = require('./is-empty');

const getErrorMessage = dataValue => `Education Backend Validator code error: ${dataValue} field is required!`;

module.exports = function validateExperienceInput(data) {
    let errors = {};
    
    // school, degree, field of study, from
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = getErrorMessage('School');
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = getErrorMessage('Degree');
    }

    if (Validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = getErrorMessage('Field of Study');
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = getErrorMessage('Date range From');
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}