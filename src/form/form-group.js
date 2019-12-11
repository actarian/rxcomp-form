import FormAbstractCollection from './form-abstract-collection';

export default class FormGroup extends FormAbstractCollection {

	/**
	 * Create a FormControl.
	 * @memberof FormModule
	 * @param {Map<string, any|FormAbstract>} controls - An object containing controls.
	 * @param {Validator[]} validators - A list of validators.
	 * @example
	 * const form = new FormGroup({
	 * 	firstName: null,
	 *  lastName: null,
	 * });
	 *
	 * form.changes$.subscribe(changes => {
	 * 	console.log(changes);
	 * });
	 */
	constructor(controls = {}, validators) {
		super(controls, validators);
	}

}

/**
 * @desc Shortcut for new FormGroup
 * @param {Map<string, any|FormAbstract>} controls
 * @param {Validator[]} validators
 */
export function formGroup(controls, validators) {
	return new FormGroup(controls, validators);
}
