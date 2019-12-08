import FormAbstractCollectionDirective from './form-abstract-collection.directive';

export default class FormGroupDirective extends FormAbstractCollectionDirective {

	get control() {
		// console.log('FormGroupDirective', (this.formGroupName ? `formGroupName ${this.formGroupName}` : `formGroup ${this.formGroup}`));
		if (this.formGroup) {
			return this.formGroup;
		} else {
			if (!this.host) {
				throw ('missing form collection');
			}
			return this.host.control.get(this.formGroupName);
		}
	}

}

FormGroupDirective.meta = {
	selector: '[formGroup],[formGroupName]',
	inputs: ['formGroup', 'formGroupName'],
	hosts: { host: FormAbstractCollectionDirective },
};
