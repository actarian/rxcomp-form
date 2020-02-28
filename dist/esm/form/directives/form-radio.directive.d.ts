import { IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from './form-abstract.directive';
/**
 * FormRadioDirective.
 * @example
 * <input type="radio" [formControl]="control" name="radioGroup" value="one" />
 * <input type="radio" [formControl]="control" name="radioGroup" value="two" />
 * <input type="radio" [formControl]="control" name="radioGroup" value="three" />
 */
export default class FormRadioDirective extends FormAbstractDirective {
    onInit(): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    onChange(event: Event): void;
    onBlur(event: FocusEvent): void;
    static meta: IFactoryMeta;
}
