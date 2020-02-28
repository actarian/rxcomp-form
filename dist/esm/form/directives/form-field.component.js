import { Component, getContext } from "rxcomp";
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
/**
 * FormFieldComponent.
 * @example
 * <div formFieldName="firstName">
 *	<input type="text" [formControl]="control" />
 * </div>
 */
export default class FormFieldComponent extends Component {
    get control() {
        // console.log('FormFieldComponent', (this.formFieldName ? `formFieldName ${this.formFieldName}` : `formField ${this.formField}`));
        if (this.formField) {
            return this.formField;
        }
        else {
            if (!this.host) {
                throw ('missing form collection');
            }
            return this.host.control.get(this.formFieldName);
        }
    }
    onChanges(changes) {
        const { node } = getContext(this);
        const flags = this.control.flags;
        Object.keys(flags).forEach((key) => {
            flags[key] ? node.classList.add(key) : node.classList.remove(key);
        });
    }
}
FormFieldComponent.meta = {
    selector: '[formField],[formFieldName]',
    inputs: ['formField', 'formFieldName'],
    hosts: { host: FormAbstractCollectionDirective },
};
