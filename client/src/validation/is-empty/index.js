// Check if value is empty, no matter the value type
const isEmpty = value => 
    value === undefined ||
    value === null ||
    (typeof value === 'object' && !Object.keys(value).length) ||
    (typeof value === 'string' && !value.trim().length)

export default isEmpty;