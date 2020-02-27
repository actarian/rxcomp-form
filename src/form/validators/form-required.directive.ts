import { Directive, IFactoryMeta } from 'rxcomp';
import { FormValidator } from '../../rxcomp-form';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { RequiredValidator } from './validators';

/**
 * FormRequiredDirective attribute for injecting RequiredValidator.
 * @example
 * <input type="text" formControlName="firstName" required />
 */
export default class FormRequiredDirective extends Directive {

    validator?: FormValidator;
    host?: FormAbstractDirective;

    onInit() {
        // console.log('FormRequiredDirective', this.host.control);
        this.validator = RequiredValidator();
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    }

    static meta: IFactoryMeta = {
        selector: '[required][formControl],[required][formControlName]',
        inputs: ['required'],
        hosts: { host: FormAbstractDirective },
    };

}
