import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
/**
 * FormPatternDirective attribute for injecting PatternValidator.
 * @example
 * <input type="text" formControlName="visa" pattern="^4[0-9]{12}(?:[0-9]{3})?$" />
 */
export default class FormPatternDirective extends Directive {
    validator?: FormValidator;
    host?: FormAbstractDirective;
    pattern?: string | RegExp;
    onInit(): void;
    onChanges(changes: Factory | Window): void;
    static meta: IFactoryMeta;
}
