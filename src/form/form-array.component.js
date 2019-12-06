import { Component, getContext } from 'rxcomp';
import { FormAttributes } from './models/form-status';

export default class FormArrayComponent extends Component {

	get form() {
		// console.log('FormArrayComponent', (this.formArrayName ? `formArrayName ${this.formArrayName}` : `formArray ${this.formArray}`));
		if (this.formArray) {
			return this.formArray;
		} else {
			const { parentInstance } = getContext(this);
			if (!parentInstance.form) {
				throw ('missing form');
			}
			return parentInstance.form.get(this.formArrayName);
		}
	}

	onChanges(changes) {
		const { node } = getContext(this);
		const form = this.form;
		FormAttributes.forEach(x => {
			if (form[x]) {
				node.classList.add(x);
			} else {
				node.classList.remove(x);
			}
		});
	}

}

FormArrayComponent.meta = {
	selector: '[[formArray]],[[formArrayName]],[formArrayName]',
	inputs: ['formArray', 'formArrayName'],
};
