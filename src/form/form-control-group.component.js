import { Component, getContext } from 'rxcomp';
import { FormAttributes } from './form-status';

export default class FormControlGroupComponent extends Component {

	get control() {
		// console.log('FormControlGroupComponent', (this.controlGroupName ? `controlGroupName ${this.controlGroupName}` : `controlGroup ${this.controlGroup}`));
		if (this.controlGroup) {
			return this.controlGroup;
		} else {
			const { parentInstance } = getContext(this);
			if (!parentInstance.form) {
				throw ('missing form');
			}
			return parentInstance.form.get(this.controlGroupName);
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

FormControlGroupComponent.meta = {
	selector: '[[controlGroup]],[[controlGroupName]],[controlGroupName]',
	inputs: ['controlGroup', 'controlGroupName'],
};
