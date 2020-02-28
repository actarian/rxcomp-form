import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { MinLengthValidator } from './validators';
/**
 * FormMinLengthDirective attribute for injecting MinLengthValidator.
 * @example
 * <input type="text" formControlName="card" minlength="12" />
 */
export default class FormMinLengthDirective extends Directive {
    constructor() {
        super(...arguments);
        this.minlength = Number.NEGATIVE_INFINITY;
    }
    onInit() {
        // console.log('FormMinLengthDirective.onInit', this.minlength);
        this.validator = MinLengthValidator(this.minlength);
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    }
    onChanges(changes) {
        // console.log('FormMinLengthDirective.onChanges', this.minlength);
        if (this.validator) {
            this.validator.params = { minlength: this.minlength };
        }
    }
}
FormMinLengthDirective.meta = {
    selector: '[minlength][formControl],[minlength][formControlName]',
    inputs: ['minlength'],
    hosts: { host: FormAbstractDirective },
};
