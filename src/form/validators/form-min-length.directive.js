import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { MinLengthValidator } from './validators';

/**
 * @desc FormMinLengthDirective attribute for injecting MinLengthValidator.
 * @example
 * <input type="text" formControlName="card" minlength="12" />
 */
export default class FormMinLengthDirective extends Directive {

	onInit() {
		// console.log('FormMinLengthDirective.onInit', this.minlength);
		const validator = this.validator = MinLengthValidator(this.minlength);
		this.host.control.addValidators(this.validator);
	}

	onChanges(changes) {
		// console.log('FormMinLengthDirective.onChanges', this.minlength);
		this.validator.params = { minlength: this.minlength };
	}

}

FormMinLengthDirective.meta = {
	selector: '[minlength][formControl],[minlength][formControlName]',
	inputs: ['minlength'],
	hosts: { host: FormAbstractDirective },
};
