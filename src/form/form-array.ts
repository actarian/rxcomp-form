import { FormValidator } from '../rxcomp-form';
import FormAbstract from './form-abstract';
import FormAbstractCollection from './form-abstract-collection';

/**
 * @desc Class representing a FormArray.
 */
export default class FormArray extends FormAbstractCollection {

	controls: FormAbstract[];

	/**
	 * @desc Create a FormArray.
	 * @example
	 * const form = new FormArray([null, null, null]);
	 *
	 * form.changes$.subscribe(changes => {
	 * 	console.log(changes);
	 * });
	 * @param {any|FormControl[]} controls - An array containing controls.
	 * @param {FormValidator[]} validators - A list of validators.
	 */
	constructor(controls: (FormAbstract | any)[] = [], validators?: (FormValidator | FormValidator[])) {
		super(controls, validators);
	}

	/**
	 * @private
	 */
	forEach_(callback: (control: FormAbstract, key: number) => any) {
		this.controls.forEach((control: FormAbstract, key: number) => callback(control, key));
	}

	/**
	 * @return {any[]}
	 */
	get value(): any[] {
		return this.reduce_((result: any[], control: FormAbstract, key: number) => {
			result[key] = control.value;
			return result;
		}, []); // init as array
	}

	/**
	 * @return {number}
	 */
	get length(): number {
		return this.controls.length;
	}

	/**
	 * @protected
	 * @param {FormAbstract} control
	 * @param {number} key
	 */
	protected init(control: FormAbstract, key: number): void {
		this.controls.length = Math.max(this.controls.length, key);
		this.controls[key] = this.initControl_(control, key);
	}

	/**
	 * @param {FormAbstract} control
	 * @param {number} key
	 */
	set(control: FormAbstract, key: number): void {
		// this.controls.length = Math.max(this.controls.length, key);
		// this.controls[key] = this.initControl_(control);
		this.controls.splice(key, 1, this.initControl_(control, key));
		this.switchSubjects_();
	}

	// !!! needed?
	/**
	 * @param {FormAbstract} control
	 * @param {number} key
	 */
	add(control: FormAbstract, key: number): void {
		this.controls.length = Math.max(this.controls.length, key);
		this.controls[key] = this.initControl_(control, key);
		this.switchSubjects_();
	}

	/**
	 * @param {FormAbstract} control
	 */
	push(control: FormAbstract): void {
		// this.controls.length = Math.max(this.controls.length, key);
		// this.controls[key] = this.initControl_(control);
		this.controls.push(this.initControl_(control, this.controls.length));
		this.switchSubjects_();
	}

	/**
	 * @param {FormAbstract} control
	 * @param {number} key
	 */
	insert(control: FormAbstract, key: number): void {
		this.controls.splice(key, 0, this.initControl_(control, key));
		this.switchSubjects_();
	}

	/**
	 * @param {FormAbstract} control
	 */
	remove(control: FormAbstract): void {
		const key: number = this.controls.indexOf(control);
		if (key !== -1) {
			this.removeKey(key);
		}
	}

	/**
	 * @param {number} key
	 */
	removeKey(key: number): void {
		if (this.controls.length > key) {
			this.controls.splice(key, 1);
			this.switchSubjects_();
		}
	}

	/**
	 * @param {number} key
	 */
	at(key: number) {
		return this.controls[key];
	}

}

/**
 * @desc Shortcut for new FormArray
 * @param {any|FormControl[]} controls
 * @param {FormValidator[]} validators
 */
export function formArray(controls: (FormAbstract | any)[] = [], validators?: FormValidator | FormValidator[]) {
	return new FormArray(controls, validators);
}
