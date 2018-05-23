
export const isRequired = value => !value ? 'This field is required': undefined;

export const isNonEmpty = value => !value.trim() ? 'Must be non empty': undefined;

export const isCorrectLength = value => value.length !== 5 ? 'Must be exactly 5 characters in length': undefined;

export const isNumber = value => Number(value) ? undefined : 'Must be a valid number';