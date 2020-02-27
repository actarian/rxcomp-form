import { getContext, IFactoryMeta } from 'rxcomp';
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

    writeValue(value: any): void {
        const node = getContext(this).node as HTMLInputElement;
        node.value = value == null ? '' : value;
    }

    onChange(event: Event): void {
        const node = getContext(this).node as HTMLInputElement;
        this.control.value = node.value === '' ? null : node.value;
    }

    onBlur(event: FocusEvent): void {
        this.control.touched = true;
    }

    static meta: IFactoryMeta = {
        selector: 'input[type=text][formControl],input[type=text][formControlName],input[type=email][formControl],input[type=email][formControlName],input[type=password][formControl],input[type=password][formControlName],textarea[formControl],textarea[formControlName]',
        inputs: ['formControl', 'formControlName'],
        hosts: { host: FormAbstractCollectionDirective },
    };

}
