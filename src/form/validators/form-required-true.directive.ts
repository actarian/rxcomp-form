import { Directive, IFactoryMeta } from 'rxcomp';
import { FormValidator } from '../../rxcomp-form';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { RequiredTrueValidator } from './validators';

/**
 * FormRequiredTrueDirective attribute for injecting RequiredTrueValidator.
 * @example
 * <input type="checkbox" formControlName="privacy" requiredTrue />
 */
export default class FormRequiredTrueDirective extends Directive {

	validator?: FormValidator;
	host?: FormAbstractDirective;

	onInit() {
		// console.log('FormRequiredTrueDirective', this.host.control);
		this.validator = RequiredTrueValidator();
		if (this.host) {
			this.host.control.addValidators(this.validator);
		}
	}

	static meta: IFactoryMeta = {
		selector: '[requiredTrue][formControl],[requiredTrue][formControlName]',
		inputs: ['requiredTrue'],
		hosts: { host: FormAbstractDirective },
	};

}
