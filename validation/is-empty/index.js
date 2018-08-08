const isEmpty = value => 
    // Returns true if undefined, null, is an object with nothing in it, or is a string but has no length
    value === undefined ||
    value === null ||
    (typeof value === 'object' && !Object.keys(value).length) ||
    (typeof value === 'string' && !value.trim().length);

module.exports = isEmpty;
