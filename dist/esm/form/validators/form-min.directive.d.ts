import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
/**
 * FormMinDirective attribute for injecting MinValidator.
 * @example
 * <input type="number" formControlName="qty" min="1" />
 */
export default class FormMinDirective extends Directive {
    validator?: FormValidator;
    host?: FormAbstractDirective;
    min: number;
    onInit(): void;
    onChanges(changes: Factory | Window): void;
    static meta: IFactoryMeta;
}
