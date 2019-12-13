import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { RequiredTrueValidator } from './validators';

/**
 * @desc FormRequiredTrueDirective attribute for injecting RequiredTrueValidator.
 * @example
 * <input type="checkbox" formControlName="privacy" requiredTrue />
 */
export default class FormRequiredTrueDirective extends Directive {

	onInit() {
		// console.log('FormRequiredTrueDirective', this.host.control);
		const validator = this.validator = RequiredTrueValidator();
		this.host.control.addValidators(validator);
	}

}

FormRequiredTrueDirective.meta = {
	selector: '[requiredTrue][formControl],[requiredTrue][formControlName]',
	inputs: ['requiredTrue'],
	hosts: { host: FormAbstractDirective },
};
