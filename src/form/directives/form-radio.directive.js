import { getContext } from 'rxcomp';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
import FormAbstractDirective from './form-abstract.directive';

/**
 * @desc FormRadioDirective.
 * @example
 * <input type="radio" [formControl]="control" name="radioGroup" value="one" />
 * <input type="radio" [formControl]="control" name="radioGroup" value="two" />
 * <input type="radio" [formControl]="control" name="radioGroup" value="three" />
 */
export default class FormRadioDirective extends FormAbstractDirective {

	onInit() {
		const { node } = getContext(this);
		this.node = node;
		// log(node.getAttributeNode('formControl').value);
		// log('name', node.name);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		// this.onFocus = this.onFocus.bind(this);
		node.addEventListener('input', this.onChange);
		// node.addEventListener('change', this.onChange);
		node.addEventListener('blur', this.onBlur);
		// node.addEventListener('focus', this.onFocus);
	}

	writeValue(value) {
		const { node } = getContext(this);
		node.checked = (node.value === value);
	}

	setDisabledState(disabled) {
		const { node } = getContext(this);
		node.disabled = disabled;
	}

	onChange(event) {
		const { node } = getContext(this);
		if (node.checked) {
			this.control.value = node.value;
		}
	}

	onBlur(event) {
		this.control.touched = true;
	}

}

FormRadioDirective.meta = {
	selector: 'input[type=radio][formControl],input[type=radio][formControlName]',
	inputs: ['formControl', 'formControlName'],
	hosts: { host: FormAbstractCollectionDirective },
};
