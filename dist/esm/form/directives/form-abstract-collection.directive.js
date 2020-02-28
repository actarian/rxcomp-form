import { Directive, getContext } from 'rxcomp';
/**
 * Abstract class representing a FormAbstractCollectionDirective.
 */
export default class FormAbstractCollectionDirective extends Directive {
    get control() {
        // !!! return null?
        return {};
    }
    onChanges(changes) {
        const { node } = getContext(this);
        const flags = this.control.flags;
        Object.keys(flags).forEach((key) => {
            flags[key] ? node.classList.add(key) : node.classList.remove(key);
        });
    }
}
FormAbstractCollectionDirective.meta = {
    selector: '',
    hosts: { host: FormAbstractCollectionDirective },
};
