import { Component, Factory, getContext, IFactoryMeta } from "rxcomp";
import FormAbstract from "../form-abstract";
import FormAbstractCollectionDirective from './form-abstract-collection.directive';

/**
 * FormFieldComponent.
 * @example
 * <div formFieldName="firstName">
 *	<input type="text" [formControl]="control" />
 * </div>
 */
export default class FormFieldComponent extends Component {

    formFieldName?: string;
    formField?: FormAbstract;
    host?: FormAbstractCollectionDirective;

    get control(): FormAbstract {
        // console.log('FormFieldComponent', (this.formFieldName ? `formFieldName ${this.formFieldName}` : `formField ${this.formField}`));
        if (this.formField) {
            return this.formField;
        } else {
            if (!this.host) {
                throw ('missing form collection');
            }
            return this.host.control.get(this.formFieldName);
        }
    }

    onChanges(changes: Factory | Window) {
        const { node } = getContext(this);
        const flags = this.control.flags;
        Object.keys(flags).forEach((key: string) => {
            flags[key] ? node.classList.add(key) : node.classList.remove(key);
        });
    }

    static meta: IFactoryMeta = {
        selector: '[formField],[formFieldName]',
        inputs: ['formField', 'formFieldName'],
        hosts: { host: FormAbstractCollectionDirective },
    };

}
