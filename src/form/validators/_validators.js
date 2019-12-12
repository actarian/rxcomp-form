import FormValidator from "./form-validator";

export default class RequiredValidator extends FormValidator {

	/**
	 * Create a RequiredValidator.
	 * @abstract
	 */
	constructor() {}

	/**
	 * validate a value
	 * @param {any} value - the value to validate
	 * @return {null|FormValidationError}
	 */
	validate(value) {
		return (value == null || value.length === 0) ? { required: true } : null;
		// return (value == null || value.length === 0) ? 'required' : null;
	}

}
