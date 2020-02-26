import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
import { MaxValidator } from './validators';

/**
 * @desc FormMaxDirective attribute for injecting MaxValidator.
 * @example
 * <input type="number" formControlName="qty" max="12" />
 */
export default class FormMaxDirective extends Directive {

	validator: FormValidator;
	host: FormAbstractDirective;
	max: number;

	onInit() {
		// console.log('FormMaxDirective.onInit', this.max);
		const validator = this.validator = MaxValidator(this.max);
		this.host.control.addValidators(this.validator);
	}

	onChanges(changes) {
		// console.log('FormMaxDirective.onChanges', this.max);
		this.validator.params = { max: this.max };
	}

	static meta = {
		selector: '[max][formControl],[max][formControlName]',
		inputs: ['max'],
		hosts: { host: FormAbstractDirective },
	};

}
