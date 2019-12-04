import FormAbstractCollection from './form-abstract-collection';

export default class FormGroup extends FormAbstractCollection {

	constructor(controls = {}, validators) {
		super(controls, validators);
	}

	/*
	forEach_(callback) {
		Object.keys(this.controls).forEach(key => callback(this.controls[key], key));
	}

	get(key) {
		return this.controls[key];
	}

	set(control, key) {
		if (this.controls[key]) {
			// unsubscribe;
		}
		delete(this.controls[key]);
		if (control) {
			this.controls[key] = control;
		}
		// subscribe
	}

	add(control, key) {
		if (control) {
			// unsubscribe;
			this.controls[key] = control;
			// subscribe
		}
	}

	remove(key) {
		if (this.controls[key]) {
			// unsubscribe;
		}
		delete(this.controls[key]);
		// subscribe
	}
	*/

}

export function formGroup(controls, validators) {
	return new FormGroup(controls, validators);
}
