import { FormValidator } from "../rxcomp-form";
import FormAbstract from "./form-abstract";
import FormStatus from './models/form-status';

/**
 * Class representing a FormControl.
 */
export default class FormControl extends FormAbstract {

	/**
	 * Create a FormControl.
	 * @example
	 * const form = new FormControl(null);
	 *
	 * form.changes$.subscribe(changes => {
	 * 	console.log(changes);
	 * });
	 * @param value The value of the control.
	 * @param validators a list of validators.
	 */
	constructor(value: any = null, validators?: FormValidator | FormValidator[]) {
		super(validators);
		this.value_ = value;
		this.status = FormStatus.Pending;
		this.errors = {};
		this.initSubjects_();
		this.initObservables_();
		this.statusSubject.next(null);
	}

}

/** Shortcut for new FormControl. */
export function formControl(value: any = null, validators?: FormValidator | FormValidator[]) {
	return new FormControl(value, validators);
}
