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

    get control(): FormArray {
        // console.log('FormArrayDirective', (this.formArrayName ? `formArrayName ${this.formArrayName}` : `formArray ${this.formArray}`));
        if (this.formArray) {
            return this.formArray;
        } else {
            if (!this.host) {
                throw ('missing form collection');
            }
            // !!! check instanceof ?
            return this.host.control.get(this.formArrayName) as FormArray;
        }
    }

    static meta: IFactoryMeta = {
        selector: '[formArray],[formArrayName]',
        inputs: ['formArray', 'formArrayName'],
        hosts: { host: FormAbstractCollectionDirective },
    };

}

