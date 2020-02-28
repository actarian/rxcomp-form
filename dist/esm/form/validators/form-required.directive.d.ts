import { Directive, IFactoryMeta } from 'rxcomp';
import { FormValidator } from '../../rxcomp-form';
import FormAbstractDirective from '../directives/form-abstract.directive';
/**
 * FormRequiredDirective attribute for injecting RequiredValidator.
 * @example
 * <input type="text" formControlName="firstName" required />
 */
export default class FormRequiredDirective extends Directive {
    validator?: FormValidator;
    host?: FormAbstractDirective;
    onInit(): void;
    static meta: IFactoryMeta;
}
