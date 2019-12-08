import { Directive, getContext } from 'rxcomp';

export default class FormPlaceholderDirective extends Directive {

	onChanges(changes) {
		const { node } = getContext(this);
		node.placeholder = this.placeholder;
	}

}

FormPlaceholderDirective.meta = {
	selector: 'input[placeholder],textarea[placeholder]',
	inputs: ['placeholder'],
};
