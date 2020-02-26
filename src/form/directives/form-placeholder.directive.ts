import { Directive, getContext } from 'rxcomp';

/**
 * @desc FormPlaceholderDirective.
 * @example
 * <input type="text" [placeholder]="'item-' + index" />
 */
export default class FormPlaceholderDirective extends Directive {

	placeholder: string;

	onChanges(changes) {
		const node = getContext(this).node as HTMLInputElement;
		node.placeholder = this.placeholder;
	}

	static meta = {
		selector: 'input[placeholder],textarea[placeholder]',
		inputs: ['placeholder'],
	};

}
