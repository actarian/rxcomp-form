import FormAbstract from "./form-abstract";

/** Class representing a FormControl. */
export default class FormControl extends FormAbstract {

	/**
	 * Create a FormControl.
	 * @param {null | string | FormControl} value - The value of the control.
	 * @param {Validator[]} validators - A list of validators.
	 * @example
	 * const form = new FormControl(null);
	 *
	 * form.changes$.subscribe(changes => {
	 * 	console.log(changes);
	 * });
	 */
	constructor(value = null, validators) {
		super(validators);
		/**
		 * @private
		 */
		this.value_ = value;
		this.initSubjects_();
		this.initObservables_();
		this.statusSubject.next(this);
	}

}

/** Shortcut for new FormControl. */
export function formControl(value, validators) {
	return new FormControl(value, validators);
}
