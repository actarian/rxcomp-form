import FormAbstractCollectionDirective from './form-abstract-collection.directive';
/**
 * FormGroupDirective.
 * @example
 * <form [formGroup]="form" (submit)="onSubmit()" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
export default class FormGroupDirective extends FormAbstractCollectionDirective {
    get control() {
        // console.log('FormGroupDirective', (this.formGroupName ? `formGroupName ${this.formGroupName}` : `formGroup ${this.formGroup}`));
        if (this.formGroup) {
            return this.formGroup;
        }
        else {
            if (!this.host) {
                throw ('missing form collection');
            }
            // !!! check instanceof ?
            return this.host.control.get(this.formGroupName);
        }
    }
}
FormGroupDirective.meta = {
    selector: '[formGroup],[formGroupName]',
    inputs: ['formGroup', 'formGroupName'],
    hosts: { host: FormAbstractCollectionDirective },
};
