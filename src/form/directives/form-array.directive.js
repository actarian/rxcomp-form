import FormAbstractCollectionDirective from './form-abstract-collection.directive';

/**
 * @desc FormArrayDirective.
 * @example
 * <form [formArray]="form" (submit)="onSubmit()" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
export default class FormArrayDirective extends FormAbstractCollectionDirective {

	get control() {
		// console.log('FormArrayDirective', (this.formArrayName ? `formArrayName ${this.formArrayName}` : `formArray ${this.formArray}`));
		if (this.formArray) {
			return this.formArray;
		} else {
			if (!this.host) {
				throw ('missing form collection');
			}
			return this.host.control.get(this.formArrayName);
		}
	}

}

FormArrayDirective.meta = {
	selector: '[formArray],[formArrayName]',
	inputs: ['formArray', 'formArrayName'],
	hosts: { host: FormAbstractCollectionDirective },
};
