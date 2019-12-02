import FormAbstractCollection from './form-abstract-collection';

export default class FormGroup extends FormAbstractCollection {

	constructor(controls = {}, validators) {
		super(controls, validators);
	}

	forEach_(callback) {
		Object.keys(this.controls).forEach(key => callback(this.controls[key], key));
	}

	get(key) {
		return this.controls[key];
	}

	set(control, key) {
		this.controls[key] = control;
	}

}

export function formGroup(controls, validators) {
	return new FormGroup(controls, validators);
}
