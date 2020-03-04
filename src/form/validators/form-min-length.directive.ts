import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
import { MinLengthValidator } from './validators';

/**
 * FormMinLengthDirective attribute for injecting MinLengthValidator.
 * @example
 * <input type="text" formControlName="card" minlength="12" />
 */
export default class FormMinLengthDirective extends Directive {

	validator?: FormValidator;
	host?: FormAbstractDirective;
	minlength: number = Number.NEGATIVE_INFINITY;

	onInit() {
		// console.log('FormMinLengthDirective.onInit', this.minlength);
		this.validator = MinLengthValidator(this.minlength);
		if (this.host) {
			this.host.control.addValidators(this.validator);
		}
	}

	onChanges(changes: Factory | Window) {
		// console.log('FormMinLengthDirective.onChanges', this.minlength);
		if (this.validator) {
			this.validator.params = { minlength: this.minlength };
		}
	}

	static meta: IFactoryMeta = {
		selector: '[minlength][formControl],[minlength][formControlName]',
		inputs: ['minlength'],
		hosts: { host: FormAbstractDirective },
	};

}
