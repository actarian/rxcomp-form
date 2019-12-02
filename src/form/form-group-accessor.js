import { Component } from 'rxcomp';

export default class FormGroupAccessor extends Component {

	getFormRef(parentFormRef) {
		// console.log('formGroupName', this.formGroupName, 'formGroup', this.formGroup, 'parentFormRef', parentFormRef);
		return this.formGroupName ? parentFormRef.get(this.formGroupName) : this.formGroup;
	}

	onChanges(changes) {
		const formRef = this.getFormRef(changes.formRef);
		// changes.formRef = formRef;
		this.formRef = formRef;
		// console.log('FormGroupAccessor.formRef', formRef);
	}

}

FormGroupAccessor.meta = {
	selector: '[[formGroup]],[[formGroupName]],[formGroupName]',
	inputs: ['formGroup', 'formGroupName'],
};
