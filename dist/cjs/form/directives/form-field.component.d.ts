import { Component, Factory, IFactoryMeta } from "rxcomp";
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
    get control(): FormAbstract;
    onChanges(changes: Factory | Window): void;
    static meta: IFactoryMeta;
}
