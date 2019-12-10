import FormAbstract from "./form-abstract";

export const VALID = 'VALID';
export const INVALID = 'INVALID';
export const PENDING = 'PENDING';
export const DISABLED = 'DISABLED';

export default class FormControl extends FormAbstract {

	constructor(value = null, validators) {
		super(validators);
		this.onChange_ = [];
		this.pendingValue_;
		this.pendingChange_;
		this.applyFormState_(value);
		this.setUpdateStrategy_(validatorOrOpts);
		this.updateValueAndValidity();
		this.initObservables_();
	}

	applyFormState_(value) {
		if (this.isBoxedValue_(value)) {
			this.value = this.pendingValue_ = value.value;
			value.disabled ? this.disable() : this.enable();
		} else {
			this.value = this.pendingValue_ = value;
		}
	}

	isDisabled_() {
		return this.disabled;
	}

	isControl_(condition) {
		return false;
	}

	updateOnSubmit_() {
		if (this.updateOn === 'submit') {
			if (this.pendingDirty_) {
				this.markAsDirty();
			}
			if (this.pendingTouched_) {
				this.markAsTouched();
			}
			if (this.pendingChange_) {
				this.setValue(this.pendingValue_);
				return true;
			}
		}
		return false;
	}

	/*
	clearChangeFns_() {
		this.onChange_ = [];
		this.onDisabledChange_ = [];
		this.onCollectionChange_ = () => {};
	}
	*/

	setValue(value, options = {}) {
		this.value = this.pendingValue_ = value;
		if (this.onChange_.length && options.emitModelToViewChange !== false) {
			this.onChange_.forEach((callback) => callback(this.value, options.emitViewToModelChange !== false));
		}
		this.updateValueAndValidity(options);
	}

	patchValue(value, options = {}) {
		this.setValue(value, options);
	}

	reset(value = null, options = {}) {
		this.applyFormState_(value);
		this.markAsPristine(options);
		this.markAsUntouched(options);
		this.setValue(this.value, options);
		this.pendingChange_ = false;
	}

	registerOnChange(callback) {
		this.onChange_.push(callback);
	}

	registerOnDisabledChange(callback) {
		this.onDisabledChange_.push(callback);
	}

}
