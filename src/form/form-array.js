import FormAbstract from './form-abstract';
import FormAbstractCollection from './form-abstract-collection';

export default class FormArray extends FormAbstractCollection {

	/**
	 * Create a FormArray.
	 * @class FormArray
	 * @param {any|FormControl[]} controls - An array containing controls.
	 * @param {FormValidator[]} validators - A list of validators.
	 * @example
	 * const form = new FormArray([null, null, null]);
	 *
	 * form.changes$.subscribe(changes => {
	 * 	console.log(changes);
	 * });
	 */
	constructor(controls = [], validators) {
		super(controls, validators);
	}

	/**
	 * @private
	 */
	forEach_(callback) {
		this.controls.forEach((control, key) => callback(control, key));
	}

	/**
	 * @return {any[]}
	 */
	get value() {
		return this.reduce_((result, control, key) => {
			result[key] = control.value;
			return result;
		}, []); // init as array
	}

	/**
	 * @return {number}
	 */
	get length() {
		return this.controls.length;
	}

	/**
	 * @protected
	 * @param {FormAbstract} control
	 * @param {number} key
	 */
	init(control, key) {
		this.controls.length = Math.max(this.controls.length, key);
		this.controls[key] = this.initControl_(control);
	}

	/**
	 * @param {FormAbstract} control
	 * @param {number} key
	 */
	set(control, key) {
		// this.controls.length = Math.max(this.controls.length, key);
		// this.controls[key] = this.initControl_(control);
		this.controls.splice(key, 1, this.initControl_(control));
		this.switchSubjects_();
	}

	// !!! needed?
	/**
	 * @param {FormAbstract} control
	 * @param {number} key
	 */
	add(control, key) {
		this.controls.length = Math.max(this.controls.length, key);
		this.controls[key] = this.initControl_(control);
		this.switchSubjects_();
	}

	/**
	 * @param {FormAbstract} control
	 */
	push(control) {
		// this.controls.length = Math.max(this.controls.length, key);
		// this.controls[key] = this.initControl_(control);
		this.controls.push(this.initControl_(control));
		this.switchSubjects_();
	}

	/**
	 * @param {FormAbstract} control
	 * @param {number} key
	 */
	insert(control, key) {
		this.controls.splice(key, 0, this.initControl_(control));
		this.switchSubjects_();
	}

	/**
	 * @param {FormAbstract} control
	 */
	remove(control) {
		const key = this.controls.indexOf(control);
		if (key !== -1) {
			this.removeKey(key);
		}
	}

	/**
	 * @param {number} key
	 */
	removeKey(key) {
		if (this.controls.length > key) {
			this.controls.splice(key, 1);
			this.switchSubjects_();
		}
	}

	/**
	 * @param {number} key
	 */
	at(key) {
		return this.controls[key];
	}

}

/**
 * @desc Shortcut for new FormArray
 * @param {any|FormControl[]} controls
 * @param {FormValidator[]} validators
 */
export function formArray(controls, validators) {
	return new FormArray(controls, validators);
}
