import { getContext, IFactoryMeta } from 'rxcomp';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
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

    writeValue(value: any) {
        const node = getContext(this).node as HTMLInputElement;
        node.value = value == null ? '' : value;
    }

    setDisabledState(disabled: boolean) {
        const node = getContext(this).node as HTMLInputElement;
        node.disabled = disabled;
    }

    onChange(event: Event) {
        const node = getContext(this).node as HTMLInputElement;
        this.control.value = node.value === '' ? null : node.value;
    }

    onBlur(event: Event) {
        this.control.touched = true;
    }

    static meta: IFactoryMeta = {
        selector: 'select[formControl],select[formControlName]',
        inputs: ['formControl', 'formControlName'],
        hosts: { host: FormAbstractCollectionDirective },
    };
}
