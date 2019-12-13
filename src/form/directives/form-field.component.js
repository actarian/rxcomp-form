import { Component, getContext } from "rxcomp";
import { FormAttributes } from '../models/form-status';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';

/**
 * @desc FormFieldComponent.
 * @example
 * <div formFieldName="firstName">
 *	<input type="text" [formControl]="control" />
 * </div>
 */
export default class FormFieldComponent extends Component {

	get control() {
		// console.log('FormFieldComponent', (this.formFieldName ? `formFieldName ${this.formFieldName}` : `formField ${this.formField}`));
		if (this.formField) {
			return this.formField;
		} else {
			if (!this.host) {
				throw ('missing form collection');
			}
			return this.host.control.get(this.formFieldName);
		}
	}

	onChanges(changes) {
		const { node } = getContext(this);
		const control = this.control;
		FormAttributes.forEach(x => {
			if (control[x]) {
				node.classList.add(x);
			} else {
				node.classList.remove(x);
			}
		});
	}

}

FormFieldComponent.meta = {
	selector: '[formField],[formFieldName]',
	inputs: ['formField', 'formFieldName'],
	hosts: { host: FormAbstractCollectionDirective },
};
