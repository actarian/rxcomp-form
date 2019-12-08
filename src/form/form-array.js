import FormAbstractCollection from './form-abstract-collection';

export default class FormArray extends FormAbstractCollection {

	constructor(controls = [], validators) {
		super(controls, validators);
	}

	forEach_(callback) {
		this.controls.forEach((control, key) => callback(control, key));
	}

	get value() {
		return this.reduce_((result, control, key) => {
			result[key] = control.value;
			return result;
		}, []); // init as array
	}

	get length() {
		return this.controls.length;
	}

	init(control, key) {
		this.controls.length = Math.max(this.controls.length, key);
		this.controls[key] = this.initControl_(control);
	}

	set(control, key) {
		// this.controls.length = Math.max(this.controls.length, key);
		// this.controls[key] = this.initControl_(control);
		this.controls.splice(key, 1, this.initControl_(control));
		this.switchSubjects_();
	}

	// !!! needed?
	add(control, key) {
		this.controls.length = Math.max(this.controls.length, key);
		this.controls[key] = this.initControl_(control);
		this.switchSubjects_();
	}

	push(control) {
		// this.controls.length = Math.max(this.controls.length, key);
		// this.controls[key] = this.initControl_(control);
		this.controls.push(this.initControl_(control));
		this.switchSubjects_();
	}

	insert(control, key) {
		this.controls.splice(key, 0, this.initControl_(control));
		this.switchSubjects_();
	}

	remove(control) {
		const key = this.controls.indexOf(control);
		if (key !== -1) {
			this.removeKey(key);
		}
	}

	removeKey(key) {
		if (this.controls.length > key) {
			this.controls.splice(key, 1);
			this.switchSubjects_();
		}
	}

	at(key) {
		return this.controls[key];
	}

}

export function formArray(controls, validators) {
	return new FormArray(controls, validators);
}
