import { Directive } from 'rxcomp';

export default class FormCollectionDirective extends Directive {

	// !!! constructor as array params or keyvalue injected?
	constructor(host = null) {
		this.host = host; // as FormCollectionDirective
	}

}

FormCollectionDirective.meta = {
	hosts: [FormCollectionDirective],
};
