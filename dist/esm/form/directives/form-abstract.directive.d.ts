import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstract from '../form-abstract';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
/**
 * Abstract class representing a FormAbstractDirective.
 */
export default class FormAbstractDirective extends Directive {
    formControlName?: string;
    formControl?: FormAbstract;
    host?: FormAbstractCollectionDirective;
    get control(): FormAbstract;
    onInit(): void;
    onChanges(changes: Factory | Window): void;
    writeValue(value: any): void;
    onChange(event: Event): void;
    onBlur(event: FocusEvent): void;
    setDisabledState(disabled: boolean): void;
    static meta: IFactoryMeta;
}
