import FormAbstractCollection from './form-abstract-collection';

export default class FormGroup extends FormAbstractCollection {

	constructor(controls = {}, validators) {
		super(controls, validators);
	}

}

export function formGroup(controls, validators) {
	return new FormGroup(controls, validators);
}
