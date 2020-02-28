import { Directive, IFactoryMeta } from 'rxcomp';
import { FormValidator } from '../../rxcomp-form';
import FormAbstractDirective from '../directives/form-abstract.directive';
/**
 * FormRequiredTrueDirective attribute for injecting RequiredTrueValidator.
 * @example
 * <input type="checkbox" formControlName="privacy" requiredTrue />
 */
export default class FormRequiredTrueDirective extends Directive {
    validator?: FormValidator;
    host?: FormAbstractDirective;
    onInit(): void;
    static meta: IFactoryMeta;
}
