import { Directive } from 'rxcomp';
import { MinLengthValidator } from '../validators/validators';
import FormAbstractDirective from './form-abstract.directive';
// import { EmailValidator, MaxLengthValidator, MaxValidator, MinLengthValidator, MinValidator, NullValidator, PatternValidator, RequiredTrueValidator, RequiredValidator } from './form/validators/validators';

export class MinLengthValidator_ {

	constructor(minlength) {
		this.minlength = minlength;
	}

	validate(value) {
		if (!value || !this.minlength) {
			return null;
		}
		const length = value ? value.length : 0;
		return length < this.minlength ? { minlength: { requiredLength: this.minlength, actualLength: length } } : null;
	}

}

export default class FormMinLengthDirective extends Directive {

	onInit() {
		console.log('FormMinLengthDirective', this.host.control, this.minlength);
		const validator = this.validator = MinLengthValidator(this.minlength);
		this.host.control.validators.push(this.validator);
	}

	onChanges(changes) {
		const validator = MinLengthValidator(this.minlength);
		this.host.control.validators.push(this.validator);
		const index = this.host.control.validators.indexOf(this.validator);
		if (index !== -1) {
			this.host.control.validators.splice(index, 1, validator);
		} else {
			this.host.control.validators.push(validator);
		}
		this.validator = validator;
	}

}

FormMinLengthDirective.meta = {
	selector: '[minlength][formControl],[minlength][formControlName]',
	inputs: ['minlength'],
	hosts: { host: FormAbstractDirective },
};
