import FormValidator from './form-validator';

export function NullValidator() {
	return new FormValidator(function(value) {
		return null;
	});
}

export function RequiredValidator() {
	return new FormValidator(function(value) {
		return (value == null || value.length === 0) ? { required: true } : null;
	});
	// return (value == null || value.length === 0) ? 'required' : null;
}

export function RequiredTrueValidator(value) {
	return new FormValidator(function(value) {
		return value === true ? null : { required: true };
	});
}

export function MinValidator(min) {
	return new FormValidator(function(value) {
		const min = this.params.min;
		if (!value || !min) {
			return null;
		}
		value = parseFloat(value);
		return !isNaN(value) && value < min ? { min: { min: min, actual: value } } : null;
	}, { min });
}

export function MaxValidator(max) {
	return new FormValidator(function(value) {
		const max = this.params.max;
		if (!value || !max) {
			return null;
		}
		value = parseFloat(value);
		return !isNaN(value) && value > max ? { max: { max: max, actual: value } } : null;
	}, { max });
}

export function MinLengthValidator(minlength) {
	return new FormValidator(function(value) {
		const minlength = this.params.minlength;
		if (!value || !minlength) {
			return null;
		}
		const length = value ? value.length : 0;
		return length < minlength ? { minlength: { requiredLength: minlength, actualLength: length } } : null;
	}, { minlength });
}

export function MaxLengthValidator(maxlength) {
	return new FormValidator(function(value) {
		const maxlength = this.params.maxlength;
		if (!value || !maxlength) {
			return null;
		}
		const length = value ? value.length : 0;
		return length > maxlength ? { minlength: { requiredLength: maxlength, actualLength: length } } : null;
	}, { maxlength });
}

export function PatternValidator(pattern) {
	return new FormValidator(function(value) {
		const pattern = this.params.pattern;
		if (!value || !pattern) {
			return null;
		}
		const regex = patternToRegEx(pattern);
		return regex.test(value) ? null : { pattern: { requiredPattern: regex.toString(), actualValue: value } };
	}, { pattern });
}

export function EmailValidator(value) {
	const regex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return new FormValidator(function(value) {
		if (!value) {
			return null;
		}
		return regex.test(value) ? null : { email: true };
	});
}

function patternToRegEx(pattern) {
	let regex;
	if (pattern instanceof RegExp) {
		regex = pattern;
	} else if (typeof pattern === 'string') {
		pattern = pattern.charAt(0) === '^' ? pattern : `^${pattern}`;
		pattern = pattern.charAt(pattern.length - 1) === '$' ? pattern : `${pattern}$`;
		regex = new RegExp(pattern);
	}
	return regex;
}
