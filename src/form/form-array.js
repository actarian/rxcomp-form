import FormAbstractCollection from './form-abstract-collection';

export default class FormArray extends FormAbstractCollection {

	constructor(controls = [], validators) {
		super(controls, validators);
	}

	forEach_(callback) {
		this.controls.forEach((control, key) => callback(control, key));
	}

	get(key) {
		return this.controls[key];
	}

	set(control, key) {
		this.controls.length = Math.max(this.controls.length, key);
		this.controls[key] = control;
	}

}

export function formArray(controls, validators) {
	return new FormArray(controls, validators);
}
