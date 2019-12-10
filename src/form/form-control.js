import FormAbstract from "./form-abstract";

/** Class representing a point. */
export default class FormControl extends FormAbstract {

	/**
	 * Create a point.
	 * @param {any} value - The value of the control.
	 * @param {validato[]} validators - A list of validators.
	 */
	constructor(value = null, validators) {
		super(validators);
		this.value_ = value;
		this.initSubjects_();
		this.initObservables_();
		this.statusSubject.next(this);
	}

}

export function formControl(value, validators) {
	return new FormControl(value, validators);
}
