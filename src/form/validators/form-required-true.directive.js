import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { RequiredTrueValidator } from './validators';

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
