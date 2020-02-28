import { getContext } from 'rxcomp';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
import FormAbstractDirective from './form-abstract.directive';
/**
 * FormInputDirective to handle input text FormControl value.
 * @example
 * <input type="text" formControlName="firstName" />
 * @example
 * <input type="text" [formControl]="form.get('firstName')" />
 */
export default class FormInputDirective extends FormAbstractDirective {
    writeValue(value) {
        const node = getContext(this).node;
        node.value = value == null ? '' : value;
    }
    onChange(event) {
        const node = getContext(this).node;
        this.control.value = node.value === '' ? null : node.value;
    }
    onBlur(event) {
        this.control.touched = true;
    }
}
FormInputDirective.meta = {
    selector: 'input[type=text][formControl],input[type=text][formControlName],input[type=email][formControl],input[type=email][formControlName],input[type=password][formControl],input[type=password][formControlName],textarea[formControl],textarea[formControlName]',
    inputs: ['formControl', 'formControlName'],
    hosts: { host: FormAbstractCollectionDirective },
};
