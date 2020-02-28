import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
/**
 * FormMinLengthDirective attribute for injecting MinLengthValidator.
 * @example
 * <input type="text" formControlName="card" minlength="12" />
 */
export default class FormMinLengthDirective extends Directive {
    validator?: FormValidator;
    host?: FormAbstractDirective;
    minlength: number;
    onInit(): void;
    onChanges(changes: Factory | Window): void;
    static meta: IFactoryMeta;
}
