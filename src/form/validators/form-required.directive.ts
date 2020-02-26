import { Directive } from 'rxcomp';
import { FormValidator } from '../../rxcomp-form';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { RequiredValidator } from './validators';

/**
 * @desc FormRequiredDirective attribute for injecting RequiredValidator.
 * @example
 * <input type="text" formControlName="firstName" required />
 */
export default class FormRequiredDirective extends Directive {

	validator: FormValidator;
	host: FormAbstractDirective;

	onInit() {
		// console.log('FormRequiredDirective', this.host.control);
		const validator = this.validator = RequiredValidator();
		this.host.control.addValidators(validator);
	}

	static meta = {
		selector: '[required][formControl],[required][formControlName]',
		inputs: ['required'],
		hosts: { host: FormAbstractDirective },
	};

}
