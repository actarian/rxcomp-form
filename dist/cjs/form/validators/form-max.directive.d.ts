import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
/**
 * FormMaxDirective attribute for injecting MaxValidator.
 * @example
 * <input type="number" formControlName="qty" max="12" />
 */
export default class FormMaxDirective extends Directive {
    validator?: FormValidator;
    host?: FormAbstractDirective;
    max: number;
    onInit(): void;
    onChanges(changes: Factory | Window): void;
    static meta: IFactoryMeta;
}
