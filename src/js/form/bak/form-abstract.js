import { Subject } from "rxjs";

export const VALID = 'VALID';
export const INVALID = 'INVALID';
export const PENDING = 'PENDING';
export const DISABLED = 'DISABLED';

export default class FormAbstract {

	constructor(validator, asyncValidator) {
		this.onCollectionChange_ = () => {};
		this.onDisabledChange_ = [];
		this.pristine = true;
		this.touched = false;
		this.valueChanges$ = new Subject();
		this.statusChanges$ = new Subject();
		/*
		pendingDirty_;
		pendingTouched_;
		updateOn_;
		parent;
		asyncValidationSubscription_;
		value;
		status;
		errors;
		*/
	}

	updateValue_() {};

	isDisabled_() {};

	isStatus_(status) {
		return this.isControl_(control => control.status === status);
	}

	calculateStatus_() {
		if (this.isDisabled_()) {
			return DISABLED;
		}
		if (this.errors) {
			return INVALID;
		}
		if (this.isStatus_(PENDING)) {
			return PENDING;
		}
		if (this.isStatus_(INVALID)) {
			return INVALID;
		}
		return VALID;
	}

	forEach_(callback) {};

	isControl_(condition) {};

	updateOnSubmit_() {};

	updateAncestors_(options) {
		if (this.parent && !options.onlySelf) {
			this.parent.updateValueAndValidity(options);
			if (!options.skipPristineCheck) {
				this.parent.updatePristine_();
			}
			this.parent.updateTouched_();
		}
	}

	/*
	updateTreeValidity_(options = { emitEvent: true }) {
		this.forEach_(control => control.updateTreeValidity_(options));
		this.updateValueAndValidity({ onlySelf: true, emitEvent: options.emitEvent });
	}
	*/

	updateControlsErrors_(emit) {
		this.status = this.calculateStatus_();
		if (emit) {
			this.emit(this.status);
		}
		if (this.parent) {
			this.parent.updateControlsErrors_(emit);
		}
	}

	updatePristine_(options = {}) {
		this.pristine = !this.isControl_(control => control.dirty);
		if (this.parent && !options.onlySelf) {
			this.parent.updatePristine_(options);
		}
	}

	updateTouched_(options = {}) {
		this.touched = this.isControl_(control => control.touched);
		if (this.parent && !options.onlySelf) {
			this.parent.updateTouched_(options);
		}
	}

	isBoxedValue_(formState) {
		return typeof formState === 'object' && formState !== null && Object.keys(formState).length === 2 && 'value' in formState && 'disabled' in formState;
	}

	setUpdateStrategy_(options) {
		if (isOptionsObj(options) && options.updateOn != null) {
			this.updateOn_ = options.updateOn;
		}
	}

	parentMarkedDirty_(onlySelf) {
		const parentDirty = this.parent && this.parent.dirty;
		return !onlySelf && parentDirty && !this.parent.isControl_(control => control.dirty);
	}

	registerOnCollectionChange_(callback) {
		this.onCollectionChange_ = callback;
	}

	get valid() { return this.status === VALID; }

	get invalid() { return this.status === INVALID; }

	get pending() { return this.status == PENDING; }

	get disabled() { return this.status === DISABLED; }

	get enabled() { return this.status !== DISABLED; }

	get dirty() { return !this.pristine; }

	get untouched() { return !this.touched; }

	get updateOn() {
		return this.updateOn_ ? this.updateOn_ : (this.parent ? this.parent.updateOn : 'change');
	}

	get root() {
		let instance = this;
		while (instance.parent) {
			instance = instance.parent;
		}
		return instance;
	}

	updateValueAndValidity(options = {}) {
		this.status = this.isDisabled_() ? DISABLED : VALID;
		this.updateValue_();
		if (this.enabled) {
			if (this.asyncValidationSubscription_) {
				this.asyncValidationSubscription_.unsubscribe();
			}
			this.errors = this.validator ? this.validator(this) : null;;
			this.status = this.calculateStatus_();
			if (this.status === VALID || this.status === PENDING) {
				if (this.asyncValidator) {
					this.status = PENDING;
					const o$ = toObservable(this.asyncValidator(this));
					this.asyncValidationSubscription_ = o$.subscribe(errors => this.setErrors(errors, { emitEvent: options.emitEvent }));
				}
			}
		}
		if (options.emitEvent !== false) {
			this.valueChanges$.next(this.value);
			this.statusChanges$.next(this.status);
		}
		if (this.parent && !options.onlySelf) {
			this.parent.updateValueAndValidity(options);
		}
	}

	setValue(value, options) {};

	patchValue(value, options) {};

	reset(value, options) {};

	setValidators(newValidator) {
		this.validator = coerceToValidator(newValidator);
	}

	setAsyncValidators(newValidator) {
		this.asyncValidator = coerceToAsyncValidator(newValidator);
	}

	clearValidators() { this.validator = null; }

	clearAsyncValidators() { this.asyncValidator = null; }

	markAsTouched(options) {
		this.touched = true;
		if (this.parent && !options.onlySelf) {
			this.parent.markAsTouched(options);
		}
	}

	markAllAsTouched() {
		this.markAsTouched({ onlySelf: true });
		this.forEach_(control => control.markAllAsTouched());
	}

	markAsUntouched(options) {
		this.touched = false;
		this.pendingTouched_ = false;
		this.forEach_(control => { control.markAsUntouched({ onlySelf: true }); });
		if (this.parent && !options.onlySelf) {
			this.parent.updateTouched_(options);
		}
	}

	markAsDirty(options = {}) {
		this.pristine = false;
		if (this.parent && !options.onlySelf) {
			this.parent.markAsDirty(options);
		}
	}

	markAsPristine(options = {}) {
		this.pristine = true;
		this.pendingDirty_ = false;
		this.forEach_(control => { control.markAsPristine({ onlySelf: true }); });
		if (this.parent && !options.onlySelf) {
			this.parent.updatePristine_(options);
		}
	}

	markAsPending(options = {}) {
		this.status = PENDING;
		if (options.emitEvent !== false) {
			this.statusChanges$.next(this.status);
		}
		if (this.parent && !options.onlySelf) {
			this.parent.markAsPending(options);
		}
	}

	disable(options = {}) {
		const skipPristineCheck = this.parentMarkedDirty_(options.onlySelf);
		this.status = DISABLED;
		this.errors = null;
		this.forEach_(control => {
			control.disable(Object.assign({ onlySelf: true }, options));
		});
		this.updateValue_();
		if (options.emitEvent !== false) {
			this.valueChanges$.next(this.value);
			this.statusChanges$.next(this.status);
		}
		this.updateAncestors_(Object.assign({ skipPristineCheck }, options));
		this.onDisabledChange_.forEach((changeFn) => changeFn(true));
	}

	enable(options = {}) {
		const skipPristineCheck = this.parentMarkedDirty_(options.onlySelf);
		this.status = VALID;
		this.forEach_(control => { control.enable(Object.assign({ onlySelf: true }, options)); });
		this.updateValueAndValidity({ onlySelf: true, emitEvent: options.emitEvent });
		this.updateAncestors_(Object.assign({ skipPristineCheck }, options));
		this.onDisabledChange_.forEach((changeFn) => changeFn(false));
	}

	setErrors(errors, options = {}) {
		this.errors = errors;
		this.updateControlsErrors_(options.emitEvent !== false);
	}

	get(path) { return find_(this, path, '.'); }

	getError(errorCode, path) {
		const control = path ? this.get(path) : this;
		return control && control.errors ? control.errors[errorCode] : null;
	}

	hasError(errorCode, path) {
		return !!this.getError(errorCode, path);
	}

}

function find_(control, path, delimiter) {
	if (path == null) {
		return null;
	}
	if (!Array.isArray(path)) {
		path = path.split(delimiter);
	}
	if (Array.isArray(path) && path.length === 0) {
		return null;
	}
	return path.reduce((control, key) => {
		if (control instanceof FormGroup) {
			return control.controls.hasOwnProperty(key) ? control.controls[key] : null;
		}
		if (control instanceof FormArray) {
			return control.at(key) || null;
		}
		return null;
	}, control);
}

function coerceToValidator(validators) {
	const validator = (isOptionsObj(validators) ? (validators).validators : validators);
	return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}

function coerceToAsyncValidator(asyncValidator, validators) {
	const origAsyncValidator = (isOptionsObj(validators) ? (validators).asyncValidators : asyncValidator);
	return Array.isArray(origAsyncValidator) ? composeAsyncValidators(origAsyncValidator) : origAsyncValidator || null;
}

function isOptionsObj(validators) {
	return validators != null && !Array.isArray(validators) && typeof validators === 'object';
}
