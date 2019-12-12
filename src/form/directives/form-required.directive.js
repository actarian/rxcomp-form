import { Directive } from 'rxcomp';
import { RequiredValidator } from '../validators/validators';
import FormAbstractDirective from './form-abstract.directive';

export default class FormRequiredDirective extends Directive {

	onInit() {
		console.log('FormRequiredDirective', this.host.control);
		this.host.control.validators.push(RequiredValidator);
	}

}

FormRequiredDirective.meta = {
	selector: '[required][formControl],[required][formControlName]',
	inputs: ['required'],
	hosts: { host: FormAbstractDirective },
};
