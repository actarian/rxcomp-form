export function NullValidator(value) {
	return null;
}

export function RequiredValidator(value) {
	return (value == null || value.length === 0) ? { required: true } : null;
	// return (value == null || value.length === 0) ? 'required' : null;
}

export function RequiredTrueValidator(value) {
	return value === true ? null : { required: true };
}

export function MinValidator(min) {
	return function(value) {
		if (!value || !min) {
			return null;
		}
		value = parseFloat(value);
		return !isNaN(value) && value < min ? { min: { min: min, actual: value } } : null;
	};
}

export function MaxValidator(max) {
	return function(value) {
		if (!value || !max) {
			return null;
		}
		value = parseFloat(value);
		return !isNaN(value) && value > max ? { max: { max: max, actual: value } } : null;
	};
}

export function MinLengthValidator(minlength) {
	return function(value) {
		if (!value || !minlength) {
			return null;
		}
		const length = value ? value.length : 0;
		return length < minlength ? { minlength: { requiredLength: minlength, actualLength: length } } : null;
	};
}

export function MaxLengthValidator(maxlength) {
	return function(value) {
		if (!value || !maxlength) {
			return null;
		}
		const length = value ? value.length : 0;
		return length > maxlength ? { minlength: { requiredLength: maxlength, actualLength: length } } : null;
	};
}

export function PatternValidator(pattern) {
	return function(value) {
		if (!value || !pattern) {
			return null;
		}
		const regex = patternToRegEx(pattern);
		return regex.test(value) ? null : { pattern: { requiredPattern: regex.toString(), actualValue: value } };
	};
}

export function EmailValidator(value) {
	if (!value) {
		return null;
	}
	const regex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return regex.test(value) ? null : { email: true };
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

/*
export function compose(validators) {
	if (!validators) {
		return null;
	}
	const presentValidators = validators.filter(isPresent);
	if (presentValidators.length == 0) {
		return null;
	}
	return function(control) {
		return _mergeErrors(_executeValidators(control, presentValidators));
	};
}

export function composeAsync(validators) {
	if (!validators) {
		return null;
	}
	const presentValidators = validators.filter(isPresent);
	if (presentValidators.length == 0) {
		return null;
	}
	return function(control) {
		const observables = _executeAsyncValidators(control, presentValidators).map(toObservable);
		return forkJoin(observables).pipe(map(_mergeErrors));
	};
}

function isPresent(o) {
	return o != null;
}

export function toObservable(r) {
	const obs = isPromise(r) ? from(r) : r;
	if (!(isObservable(obs))) {
		throw new Error(`Expected validator to return Promise or Observable.`);
	}
	return obs;
}

function _executeValidators(control, validators) {
	return validators.map(v => v(control));
}

function _executeAsyncValidators(control, validators) {
	return validators.map(v => v(control));
}

function _mergeErrors(arrayOfErrors) {
	const res = arrayOfErrors.reduce((res, errors) => {
		return errors != null ? { ...res, ...errors } : res;
	}, {});
	return Object.keys(res).length === 0 ? null : res;
}
*/
