import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { MinValidator } from './validators';

/**
 * @desc FormMinDirective attribute for injecting MinValidator.
 * @example
 * <input type="number" formControlName="qty" min="1" />
 */
export default class FormMinDirective extends Directive {

	onInit() {
		// console.log('FormMinDirective.onInit', this.min);
		const validator = this.validator = MinValidator(this.min);
		this.host.control.addValidators(this.validator);
	}

	onChanges(changes) {
		// console.log('FormMinDirective.onChanges', this.min);
		this.validator.params = { min: this.min };
	}

}

FormMinDirective.meta = {
	selector: '[min][formControl],[min][formControlName]',
	inputs: ['min'],
	hosts: { host: FormAbstractDirective },
};
