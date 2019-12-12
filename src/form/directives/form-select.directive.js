import { getContext } from 'rxcomp';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
import FormAbstractDirective from './form-abstract.directive';

/**
 * @desc FormSelectDirective.
 */
export default class FormSelectDirective extends FormAbstractDirective {

	writeValue(value) {
		const { node } = getContext(this);
		node.value = value == null ? '' : value;
	}

	setDisabledState(disabled) {
		const { node } = getContext(this);
		node.disabled = disabled;
	}

	onChange(event) {
		const { node } = getContext(this);
		this.control.value = node.value === '' ? null : node.value;
	}

	onBlur(event) {
		this.control.touched = true;
	}

}

FormSelectDirective.meta = {
	selector: 'select[formControl],select[formControlName]',
	inputs: ['formControl', 'formControlName'],
	hosts: { host: FormAbstractCollectionDirective },
};
