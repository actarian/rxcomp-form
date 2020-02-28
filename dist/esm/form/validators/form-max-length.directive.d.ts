import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
/**
 * FormMaxLengthDirective attribute for injecting MaxLengthValidator.
 * @example
 * <input type="text" formControlName="card" maxlength="12" />
 */
export default class FormMaxLengthDirective extends Directive {
    validator?: FormValidator;
    host?: FormAbstractDirective;
    maxlength: number;
    onInit(): void;
    onChanges(changes: Factory | Window): void;
    static meta: IFactoryMeta;
}
