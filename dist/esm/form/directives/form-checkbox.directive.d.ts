import { IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from './form-abstract.directive';
/**
 * FormCheckboxDirective.
 * @example
 * <input type="checkbox" formControlName="privacy" [value]="true" requiredTrue />
 * @example
 * <input type="checkbox" [formControl]="control" [value]="true" requiredTrue />
 */
export default class FormCheckboxDirective extends FormAbstractDirective {
    value?: any;
    onInit(): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    onChange(event: Event): void;
    onBlur(event: FocusEvent): void;
    static meta: IFactoryMeta;
}
