import { Directive } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import { MaxValidator } from './validators';
/**
 * FormMaxDirective attribute for injecting MaxValidator.
 * @example
 * <input type="number" formControlName="qty" max="12" />
 */
export default class FormMaxDirective extends Directive {
    constructor() {
        super(...arguments);
        this.max = Number.POSITIVE_INFINITY;
    }
    onInit() {
        // console.log('FormMaxDirective.onInit', this.max);
        this.validator = MaxValidator(this.max);
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    }
    onChanges(changes) {
        // console.log('FormMaxDirective.onChanges', this.max);
        if (this.validator) {
            this.validator.params = { max: this.max };
        }
    }
}
FormMaxDirective.meta = {
    selector: '[max][formControl],[max][formControlName]',
    inputs: ['max'],
    hosts: { host: FormAbstractDirective },
};
