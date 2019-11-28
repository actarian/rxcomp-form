import FormAbstract from "./form-abstract";

export default class FormGroup extends FormAbstract {

	constructor(controls, validators) {
		super(controls, validators);
		this.initObservables_();
		this.setUpdateStrategy_();
		this.setUpControls_();
		this.updateValueAndValidity();
	}

	setUpControls_() {
		this.forEach_((control) => {
			control.setParent(this);
			control.registerOnCollectionChange_(this.onCollectionChange_);
		});
	}

	isDisabled_() {
		for (const key of Object.keys(this.controls)) {
			if (this.controls[key].enabled) {
				return false;
			}
		}
		return Object.keys(this.controls).length > 0 || this.disabled;
	}

	isControl_(condition) {
		let match = false;
		this.forEach_((control, key) => {
			match = match || (this.contains(key) && condition(control));
		});
		return match;
	}

	forEach_(callback) {
		Object.keys(this.controls).forEach(k => callback(this.controls[k], k));
	}

	reduce_(callback, value) {
		this.forEach_((control, key) => {
			value = callback(value, control, key);
		});
		return value;
	}

	updateValue_() {
		this.value = this.reduce_((value, control, key) => {
			if (control.enabled || this.disabled) {
				value[key] = control.value;
			}
			return value;
		}, {});
	}

	updateOnSubmit_() {
		const pending = this.reduce_((value, control) => {
			return control.updateOnSubmit_() ? true : value;
		}, false);
		if (pending) {
			this.updateValueAndValidity();
		}
		return pending;
	}

	throwIfControlMissing_(key) {
		if (!Object.keys(this.controls).length) {
			throw new Error(`
		  There are no form controls registered with this group yet.  If you're using ngModel,
		  you may want to check next tick (e.g. use setTimeout).
		`);
		}
		if (!this.controls[key]) {
			throw new Error(`Cannot find form control with name: ${key}.`);
		}
	}

	checkAllValuesPresent_(value) {
		this.forEach_((control, key) => {
			if (value[key] === undefined) {
				throw new Error(`Must supply a value for form control with name: '${key}'.`);
			}
		});
	}

	registerControl(key, control) {
		if (this.controls[key]) {
			return this.controls[key];
		}
		this.controls[key] = control;
		control.setParent(this);
		control.registerOnCollectionChange_(this.onCollectionChange_);
		return control;
	}

	addControl(key, control) {
		this.registerControl(key, control);
		this.updateValueAndValidity();
		this.onCollectionChange_();
	}

	removeControl(key) {
		if (this.controls[key]) {
			this.controls[key].registerOnCollectionChange_(() => {});
		}
		delete(this.controls[key]);
		this.updateValueAndValidity();
		this.onCollectionChange_();
	}

	setControl(key, control) {
		if (this.controls[key]) {
			this.controls[key].registerOnCollectionChange_(() => {});
		}
		delete(this.controls[key]);
		if (control) {
			this.registerControl(key, control);
		}
		this.updateValueAndValidity();
		this.onCollectionChange_();
	}

	contains(key) {
		return this.controls.hasOwnProperty(key) && this.controls[key].enabled;
	}

	setValue(value, options) {
		this.checkAllValuesPresent_(value);
		Object.keys(value).forEach(key => {
			this.throwIfControlMissing_(key);
			this.controls[key].setValue(value[key]);
		});
		this.updateValueAndValidity(options);
	}

	patchValue(value, options = {}) {
		Object.keys(value).forEach(key => {
			if (this.controls[key]) {
				this.controls[key].patchValue(value[key]);
			}
		});
		this.updateValueAndValidity(options);
	}

	reset(value, options = {}) {
		this.forEach_((control, key) => {
			control.reset(value[key]);
		});
		this.updatePristine_(options);
		this.updateTouched_(options);
		this.updateValueAndValidity(options);
	}

	getRawValue() {
		return this.reduce_((value, control, key) => {
			value[key] = control instanceof FormControl ? control.value : control.getRawValue();
			return value;
		}, {});
	}

}
