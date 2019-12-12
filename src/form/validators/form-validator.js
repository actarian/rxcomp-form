export default class FormValidator {

	/**
	 * Create a FormValidator.
	 * @abstract
	 */
	constructor() {}

	/**
	 * validate a value
	 * @param {any} value - the value to validate
	 * @return {null|FormError}
	 */
	validate(value) {
		return null;
	}

}
