import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
import { EmailValidator } from './validators';

/**
 * @desc FormEmailDirective attribute for injecting EmailValidator.
 * @example
 * <input type="text" formControlName="email" email />
 */
export default class FormEmailDirective extends Directive {

	validator: FormValidator;
	host: FormAbstractDirective;

	onInit() {
		// console.log('FormEmailDirective', this.host.control);
		const validator = this.validator = EmailValidator();
		this.host.control.addValidators(validator);
	}

	static meta = {
		selector: '[email][formControl],[email][formControlName]',
		inputs: ['email'],
		hosts: { host: FormAbstractDirective },
	};

}
