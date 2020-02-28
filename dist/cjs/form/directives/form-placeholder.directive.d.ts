import { Directive, Factory, IFactoryMeta } from 'rxcomp';
/**
 * FormPlaceholderDirective.
 * @example
 * <input type="text" [placeholder]="'item-' + index" />
 */
export default class FormPlaceholderDirective extends Directive {
    placeholder?: string;
    onChanges(changes: Factory | Window): void;
    static meta: IFactoryMeta;
}
