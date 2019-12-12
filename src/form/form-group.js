import FormAbstractCollection from './form-abstract-collection';

/**
 * @desc Class representing a FormGroup.
 */
export default class FormGroup extends FormAbstractCollection {

	/**
	 * @desc Create a FormControl.
	 * @example
	 * const form = new FormGroup({
	 * 	firstName: null,
	 *  lastName: null,
	 * });
	 *
	 * form.changes$.subscribe(changes => {
	 * 	console.log(changes);
	 * });
	 * @param {Map<string, any|FormAbstract>} controls - An object containing controls.
	 * @param {FormValidator[]} validators - A list of validators.
	 */
	constructor(controls = {}, validators) {
		super(controls, validators);
	}

}

/**
 * @desc Shortcut for new FormGroup
 * @param {Map<string, any|FormAbstract>} controls
 * @param {FormValidator[]} validators
 */
export function formGroup(controls, validators) {
	return new FormGroup(controls, validators);
}
