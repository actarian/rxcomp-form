import { IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from './form-abstract.directive';
/**
 * FormInputDirective to handle input text FormControl value.
 * @example
 * <input type="text" formControlName="firstName" />
 * @example
 * <input type="text" [formControl]="form.get('firstName')" />
 */
export default class FormInputDirective extends FormAbstractDirective {
    writeValue(value: any): void;
    onChange(event: Event): void;
    onBlur(event: FocusEvent): void;
    static meta: IFactoryMeta;
}
