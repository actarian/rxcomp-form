import { IFactoryMeta } from 'rxcomp';
import FormArray from '../form-array';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
/**
 * FormArrayDirective.
 * @example
 * <form [formArray]="form" (submit)="onSubmit()" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
export default class FormArrayDirective extends FormAbstractCollectionDirective {
    formArrayName?: string;
    formArray?: FormArray;
    host?: FormAbstractCollectionDirective;
    get control(): FormArray;
    static meta: IFactoryMeta;
}
