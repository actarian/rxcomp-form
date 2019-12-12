import { Directive, getContext } from 'rxcomp';
import { FormAttributes } from '../models/form-status';

/**
 * @desc Abstract class representing a FormAbstractCollectionDirective.
 * @abstract
 * @access public
 */
export default class FormAbstractCollectionDirective extends Directive {

	get control() {
		return {};
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

FormAbstractCollectionDirective.meta = {
	// no selection, abstract class
	hosts: { host: FormAbstractCollectionDirective },
};
