import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { RequiredValidator } from './validators';

/**
 * @desc FormRequiredDirective attribute for injecting RequiredValidator.
 */
export default class FormRequiredDirective extends Directive {

	onInit() {
		// console.log('FormRequiredDirective', this.host.control);
		const validator = this.validator = RequiredValidator();
		this.host.control.addValidators(validator);
	}

}

FormRequiredDirective.meta = {
	selector: '[required][formControl],[required][formControlName]',
	inputs: ['required'],
	hosts: { host: FormAbstractDirective },
};
