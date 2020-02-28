import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { RequiredTrueValidator } from './validators';
/**
 * FormRequiredTrueDirective attribute for injecting RequiredTrueValidator.
 * @example
 * <input type="checkbox" formControlName="privacy" requiredTrue />
 */
export default class FormRequiredTrueDirective extends Directive {
    onInit() {
        // console.log('FormRequiredTrueDirective', this.host.control);
        this.validator = RequiredTrueValidator();
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    }
}
FormRequiredTrueDirective.meta = {
    selector: '[requiredTrue][formControl],[requiredTrue][formControlName]',
    inputs: ['requiredTrue'],
    hosts: { host: FormAbstractDirective },
};
