import { Directive, Factory, getContext, IFactoryMeta } from 'rxcomp';
import FormAbstractCollection from '../form-abstract-collection';

/**
 * Abstract class representing a FormAbstractCollectionDirective.
 */
export default class FormAbstractCollectionDirective extends Directive {

	get control(): FormAbstractCollection {
		// !!! return null?
		return {} as FormAbstractCollection;
	}

	onChanges(changes: Factory | Window) {
		const { node } = getContext(this);
		const flags = this.control.flags;
		Object.keys(flags).forEach((key: string) => {
			flags[key] ? node.classList.add(key) : node.classList.remove(key);
		});
	}

	static meta: IFactoryMeta = {
		selector: '', // no selection, abstract class
		hosts: { host: FormAbstractCollectionDirective },
	};

}

