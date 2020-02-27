import { Directive, Factory, getContext, IFactoryMeta } from 'rxcomp';

/**
 * FormPlaceholderDirective.
 * @example
 * <input type="text" [placeholder]="'item-' + index" />
 */
export default class FormPlaceholderDirective extends Directive {

    placeholder?: string;

    onChanges(changes: Factory | Window) {
        const node = getContext(this).node as HTMLInputElement;
        node.setAttribute('placeholder', this.placeholder || '');
    }

    static meta: IFactoryMeta = {
        selector: 'input[placeholder],textarea[placeholder]',
        inputs: ['placeholder'],
    };

}
