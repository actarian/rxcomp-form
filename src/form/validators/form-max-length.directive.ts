import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from '../directives/form-abstract.directive';
import FormValidator from './form-validator';
import { MaxLengthValidator } from './validators';
// import { EmailValidator, MaxLengthValidator, MaxValidator, MaxLengthValidator, MaxValidator, NullValidator, PatternValidator, RequiredTrueValidator, RequiredValidator } from './form/validators/validators';

/**
 * FormMaxLengthDirective attribute for injecting MaxLengthValidator.
 * @example
 * <input type="text" formControlName="card" maxlength="12" />
 */
export default class FormMaxLengthDirective extends Directive {

    validator?: FormValidator;
    host?: FormAbstractDirective;
    maxlength: number = Number.POSITIVE_INFINITY;

    onInit() {
        // console.log('FormMaxLengthDirective.onInit', this.maxlength);
        this.validator = MaxLengthValidator(this.maxlength);
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    }

    onChanges(changes: Factory | Window) {
        // console.log('FormMaxLengthDirective.onChanges', this.maxlength);
        if (this.validator) {
            this.validator.params = { maxlength: this.maxlength };
        }
    }

    static meta: IFactoryMeta = {
        selector: '[maxlength][formControl],[maxlength][formControlName]',
        inputs: ['maxlength'],
        hosts: { host: FormAbstractDirective },
    };

}
