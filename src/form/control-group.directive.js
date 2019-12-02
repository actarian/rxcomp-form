import { Directive, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { FormAttributes } from './form-status';

export default class ControlGroupDirective extends Directive {

	getFormRef(parentFormRef) {
		// console.log('controlGroupName', this.controlGroupName, 'controlGroup', this.controlGroup, 'parentFormRef', parentFormRef);
		return this.controlGroupName ? parentFormRef.get(this.controlGroupName) : this.controlGroup;
	}

	onChanges(changes) {
		const { node } = getContext(this);
		const formRef = this.getFormRef(changes.formRef);
		this.formRef = formRef;
		formRef.status$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(status => {
			FormAttributes.forEach(x => {
				if (formRef[x]) {
					node.classList.add(x);
				} else {
					node.classList.remove(x);
				}
			});
		});
	}

}

ControlGroupDirective.meta = {
	selector: '[[controlGroup]],[[controlGroupName]],[controlGroupName]',
	inputs: ['controlGroup', 'controlGroupName'],
};
