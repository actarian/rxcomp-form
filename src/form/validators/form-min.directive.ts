import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
import { MinValidator } from './validators';

/**
 * FormMinDirective attribute for injecting MinValidator.
 * @example
 * <input type="number" formControlName="qty" min="1" />
 */
export default class FormMinDirective extends Directive {

    validator?: FormValidator;
    host?: FormAbstractDirective;
    min: number = Number.NEGATIVE_INFINITY;

    onInit() {
        // console.log('FormMinDirective.onInit', this.min);
        this.validator = MinValidator(this.min);
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    }

    onChanges(changes: Factory | Window) {
        // console.log('FormMinDirective.onChanges', this.min);
        if (this.validator) {
            this.validator.params = { min: this.min };
        }
    }

    static meta: IFactoryMeta = {
        selector: '[min][formControl],[min][formControlName]',
        inputs: ['min'],
        hosts: { host: FormAbstractDirective },
    };

}
