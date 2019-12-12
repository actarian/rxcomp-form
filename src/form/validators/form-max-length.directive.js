import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { MaxLengthValidator } from './validators';
// import { EmailValidator, MaxLengthValidator, MaxValidator, MaxLengthValidator, MaxValidator, NullValidator, PatternValidator, RequiredTrueValidator, RequiredValidator } from './form/validators/validators';

/**
 * @desc FormMaxLengthDirective attribute for injecting MaxLengthValidator.
 */
export default class FormMaxLengthDirective extends Directive {

	onInit() {
		// console.log('FormMaxLengthDirective.onInit', this.maxlength);
		const validator = this.validator = MaxLengthValidator(this.maxlength);
		this.host.control.addValidators(this.validator);
	}

	onChanges(changes) {
		// console.log('FormMaxLengthDirective.onChanges', this.maxlength);
		this.validator.params = { maxlength: this.maxlength };
	}

}

FormMaxLengthDirective.meta = {
	selector: '[maxlength][formControl],[maxlength][formControlName]',
	inputs: ['maxlength'],
	hosts: { host: FormAbstractDirective },
};
