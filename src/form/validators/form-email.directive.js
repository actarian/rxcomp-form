import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { EmailValidator } from './validators';

/**
 * @desc FormEmailDirective attribute for injecting EmailValidator.
 */
export default class FormEmailDirective extends Directive {

	onInit() {
		// console.log('FormEmailDirective', this.host.control);
		const validator = this.validator = EmailValidator();
		this.host.control.addValidators(validator);
	}

}

FormEmailDirective.meta = {
	selector: '[email][formControl],[email][formControlName]',
	inputs: ['email'],
	hosts: { host: FormAbstractDirective },
};
