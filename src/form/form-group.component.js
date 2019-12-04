import { Component, getContext } from 'rxcomp';
import { FormAttributes } from './form-status';

export default class FormGroupComponent extends Component {

	get form() {
		// console.log('FormGroupComponent', (this.formGroupName ? `formGroupName ${this.formGroupName}` : `formGroup ${this.formGroup}`));
		if (this.formGroup) {
			return this.formGroup;
		} else {
			const { parentInstance } = getContext(this);
			if (!parentInstance.form) {
				throw ('missing form');
			}
			return parentInstance.form.get(this.formGroupName);
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

	/*
	getFormRef(parentFormRef) {
		// console.log('FormGroupComponent', (this.formGroupName ? `formGroupName ${this.formGroupName}` : `formGroup ${this.formGroup}`, `parentFormRef ${parentFormRef}`));
		return this.formGroupName ? parentFormRef.get(this.formGroupName) : this.formGroup;
	}

	onChanges(changes) {
		const formRef = this.getFormRef(changes.formRef);
		// changes.formRef = formRef;
		this.formRef = formRef;
		// console.log('FormGroupComponent.formRef', formRef);
		const { node } = getContext(this);
		FormAttributes.forEach(x => {
			if (this.formRef[x]) {
				node.classList.add(x);
			} else {
				node.classList.remove(x);
			}
		});
	}
	*/

}

FormGroupComponent.meta = {
	selector: '[[formGroup]],[[formGroupName]],[formGroupName]',
	inputs: ['formGroup', 'formGroupName'],
};
