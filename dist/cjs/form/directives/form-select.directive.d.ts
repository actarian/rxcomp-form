import { IFactoryMeta } from 'rxcomp';
import FormAbstractDirective from './form-abstract.directive';
/**
 * FormSelectDirective.
 * @example
 * <select formControlName="country">
 * 	<option value="">select</option>
 * 	<option value="en-US">English</option>
 * 	<option value="it-IT">Italiano</option>
 * </select>
 * @example
 * <select [formControl]="control">
 * 	<option value="">select</option>
 * 	<option value="en-US">English</option>
 * 	<option value="it-IT">Italiano</option>
 * </select>
 */
export default class FormSelectDirective extends FormAbstractDirective {
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    onChange(event: Event): void;
    onBlur(event: Event): void;
    static meta: IFactoryMeta;
}
