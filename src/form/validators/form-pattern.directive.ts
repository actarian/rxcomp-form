import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
import { PatternValidator } from './validators';

/**
 * @desc FormPatternDirective attribute for injecting PatternValidator.
 * @example
 * <input type="text" formControlName="visa" pattern="^4[0-9]{12}(?:[0-9]{3})?$" />
 */
export default class FormPatternDirective extends Directive {

	validator: FormValidator;
	host: FormAbstractDirective;
	pattern: string | RegExp;

	onInit() {
		// console.log('FormPatternDirective.onInit', this.pattern);
		const validator = this.validator = PatternValidator(this.pattern);
		this.host.control.addValidators(this.validator);
	}

	onChanges(changes) {
		// console.log('FormPatternDirective.onChanges', this.pattern);
		this.validator.params = { pattern: this.pattern };
	}

	static meta = {
		selector: '[pattern][formControl],[pattern][formControlName]',
		inputs: ['pattern'],
		hosts: { host: FormAbstractDirective },
	};

}
