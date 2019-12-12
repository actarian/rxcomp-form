import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { MaxValidator } from './validators';

/**
 * @desc FormMaxDirective attribute for injecting MaxValidator.
 */
export default class FormMaxDirective extends Directive {

	onInit() {
		// console.log('FormMaxDirective.onInit', this.max);
		const validator = this.validator = MaxValidator(this.max);
		this.host.control.addValidators(this.validator);
	}

	onChanges(changes) {
		// console.log('FormMaxDirective.onChanges', this.max);
		this.validator.params = { max: this.max };
	}

}

FormMaxDirective.meta = {
	selector: '[max][formControl],[max][formControlName]',
	inputs: ['max'],
	hosts: { host: FormAbstractDirective },
};
