import { IFactoryMeta } from 'rxcomp';
import FormGroup from '../form-group';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
/**
 * FormGroupDirective.
 * @example
 * <form [formGroup]="form" (submit)="onSubmit()" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
export default class FormGroupDirective extends FormAbstractCollectionDirective {
    formGroupName?: string;
    formGroup?: FormGroup;
    host?: FormAbstractCollectionDirective;
    get control(): FormGroup;
    static meta: IFactoryMeta;
}
