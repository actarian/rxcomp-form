import { FormValidator } from "../rxcomp-form";
import FormAbstract from "./form-abstract";
import FormStatus from './models/form-status';

/**
 * @desc Class representing a FormControl.
 */
export default class FormControl extends FormAbstract {

	/**
	 * @desc Create a FormControl.
	 * @example
	 * const form = new FormControl(null);
	 *
	 * form.changes$.subscribe(changes => {
	 * 	console.log(changes);
	 * });
	 * @param {null | string | FormControl} value - The value of the control.
	 * @param {FormValidator[]} validators - A list of validators.
	 */
	constructor(value: any = null, validators?: FormValidator | FormValidator[]) {
		super(validators);
		/**
		 * @private
		 */
		this.value_ = value;
		/**
		 * @private
		 */
		this.status = FormStatus.Pending;
		this.errors = {};
		this.initSubjects_();
		this.initObservables_();
		this.statusSubject.next(this);
	}

}

/** Shortcut for new FormControl. */
export function formControl(value: any = null, validators?: FormValidator | FormValidator[]) {
	return new FormControl(value, validators);
}
