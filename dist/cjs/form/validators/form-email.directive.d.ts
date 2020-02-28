import { Directive, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
/**
 * FormEmailDirective attribute for injecting EmailValidator.
 * @example
 * <input type="text" formControlName="email" email />
 */
export default class FormEmailDirective extends Directive {
    validator?: FormValidator;
    host?: FormAbstractDirective;
    onInit(): void;
    static meta: IFactoryMeta;
}
