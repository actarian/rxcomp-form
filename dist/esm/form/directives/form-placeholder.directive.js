import { Directive, getContext } from 'rxcomp';
/**
 * FormPlaceholderDirective.
 * @example
 * <input type="text" [placeholder]="'item-' + index" />
 */
export default class FormPlaceholderDirective extends Directive {
    onChanges(changes) {
        const node = getContext(this).node;
        node.setAttribute('placeholder', this.placeholder || '');
    }
}
FormPlaceholderDirective.meta = {
    selector: 'input[placeholder],textarea[placeholder]',
    inputs: ['placeholder'],
};
