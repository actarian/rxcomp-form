import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
import { MaxLengthValidator } from './validators';
// import { EmailValidator, MaxLengthValidator, MaxValidator, MaxLengthValidator, MaxValidator, NullValidator, PatternValidator, RequiredTrueValidator, RequiredValidator } from './form/validators/validators';

/**
 * @desc FormMaxLengthDirective attribute for injecting MaxLengthValidator.
 * @example
 * <input type="text" formControlName="card" maxlength="12" />
 */
export default class FormMaxLengthDirective extends Directive {

	validator: FormValidator;
	host: FormAbstractDirective;
	maxlength: number;

	onInit() {
		// console.log('FormMaxLengthDirective.onInit', this.maxlength);
		const validator = this.validator = MaxLengthValidator(this.maxlength);
		this.host.control.addValidators(this.validator);
	}

	onChanges(changes) {
		// console.log('FormMaxLengthDirective.onChanges', this.maxlength);
		this.validator.params = { maxlength: this.maxlength };
	}

	static meta = {
		selector: '[maxlength][formControl],[maxlength][formControlName]',
		inputs: ['maxlength'],
		hosts: { host: FormAbstractDirective },
	};

}
