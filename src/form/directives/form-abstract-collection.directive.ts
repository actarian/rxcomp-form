import { Directive, getContext } from 'rxcomp';
import FormAbstractCollection from '../form-abstract-collection';
import { FormAttributes } from '../models/form-status';

/**
 * @desc Abstract class representing a FormAbstractCollectionDirective.
 * @abstract
 * @access public
 */
export default class FormAbstractCollectionDirective extends Directive {

	get control(): FormAbstractCollection {
		// !!! return null?
		return {} as FormAbstractCollection;
	}

	onChanges(changes: any) {
		const { node } = getContext(this);
		const control = this.control;
		FormAttributes.forEach((attribute: string) => {
			if (control[attribute]) {
				node.classList.add(attribute);
			} else {
				node.classList.remove(attribute);
			}
		});
	}

	static meta = {
		selector: null, // no selection, abstract class
		hosts: { host: FormAbstractCollectionDirective },
	};

}

