import FormAbstract from "./form-abstract";

export default class FormArray extends FormAbstract {

	constructor(controls, validators) {
		super(controls, validators);
		this.initObservables_();
		this.setUpdateStrategy_();
		this.setUpControls_();
		this.updateValueAndValidity();
	}

	setUpControls_() {
		this.forEach_((control) => this.registerControl_(control));
	}

	registerControl_(control) {
		control.setParent(this);
		control.registerOnCollectionChange_(this.onCollectionChange_);
	}

	isDisabled_() {
		for (const control of this.controls) {
			if (control.enabled) {
				return false;
			}
		}
		return this.controls.length > 0 || this.disabled;
	}

	isControl_(condition) {
		return this.controls.some((control) => control.enabled && condition(control));
	}

	at(index) {
		return this.controls[index];
	}

	push(control) {
		this.controls.push(control);
		this.registerControl_(control);
		this.updateValueAndValidity();
		this.onCollectionChange_();
	}

	insert(index, control) {
		this.controls.splice(index, 0, control);
		this.registerControl_(control);
		this.updateValueAndValidity();
	}

	removeAt(index) {
		if (this.controls[index]) {
			this.controls[index].registerOnCollectionChange_(() => {});
		}
		this.controls.splice(index, 1);
		this.updateValueAndValidity();
	}

	setControl(index, control) {
		if (this.controls[index]) {
			this.controls[index].registerOnCollectionChange_(() => {});
		}
		this.controls.splice(index, 1);
		if (control) {
			this.controls.splice(index, 0, control);
			this.registerControl_(control);
		}
		this.updateValueAndValidity();
		this.onCollectionChange_();
	}

	get length() {
		return this.controls.length;
	}

	setValue(value, options = {}) {
		this.checkAllValuesPresent_(value);
		value.forEach((newValue, index) => {
			this.throwIfControlMissing_(index);
			this.at(index).setValue(newValue);
		});
		this.updateValueAndValidity(options);
	}

	patchValue(value, options = {}) {
		value.forEach((newValue, index) => {
			if (this.at(index)) {
				this.at(index).patchValue(newValue);
			}
		});
		this.updateValueAndValidity(options);
	}

	reset(value, options = {}) {
		this.forEach_((control, index) => {
			control.reset(value[index]);
		});
		this.updatePristine_(options);
		this.updateTouched_(options);
		this.updateValueAndValidity(options);
	}

	clear() {
		if (this.controls.length < 1) {
			return;
		}
		this.forEach_((control) => control.registerOnCollectionChange_(() => {}));
		this.controls.splice(0);
		this.updateValueAndValidity();
	}

	getRawValue() {
		return this.controls.map((control) => {
			return control instanceof FormControl ? control.value : control.getRawValue();
		});
	}

	forEach_(callback) {
		this.controls.forEach((control, index) => {
			callback(control, index);
		});
	}

	updateOnSubmit_() {
		const pending = this.controls.reduce((value, control) => {
			return control.updateOnSubmit_() ? true : value;
		}, false);
		if (pending) {
			this.updateValueAndValidity();
		}
		return pending;
	}

	throwIfControlMissing_(index) {
		if (!this.controls.length) {
			throw new Error(`
		  There are no form controls registered with this array yet.  If you're using ngModel,
		  you may want to check next tick (e.g. use setTimeout).
		`);
		}
		if (!this.at(index)) {
			throw new Error(`Cannot find form control at index ${index}`);
		}
	}

	updateValue_() {
		this.value = this.controls.filter((control) => control.enabled || this.disabled).map((control) => control.value);
	}

	checkAllValuesPresent_(value) {
		this.forEach_((control, i) => {
			if (value[i] === undefined) {
				throw new Error(`Must supply a value for form control at index: ${i}.`);
			}
		});
	}

}
