import { getContext } from 'rxcomp';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
import FormAbstractDirective from './form-abstract.directive';

/**
 * @desc FormInputDirective.
 */
export default class FormInputDirective extends FormAbstractDirective {

	writeValue(value) {
		const { node } = getContext(this);
		node.value = value == null ? '' : value;
	}

	onChange(event) {
		const { node } = getContext(this);
		this.control.value = node.value === '' ? null : node.value;
	}

	onBlur(event) {
		this.control.touched = true;
	}

}

FormInputDirective.meta = {
	selector: 'input[type=text][formControl],input[type=text][formControlName],input[type=email][formControl],input[type=email][formControlName],input[type=password][formControl],input[type=password][formControlName],textarea[formControl],textarea[formControlName]',
	inputs: ['formControl', 'formControlName'],
	hosts: { host: FormAbstractCollectionDirective },
};
