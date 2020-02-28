import { Directive, Factory, IFactoryMeta } from 'rxcomp';
import FormAbstractCollection from '../form-abstract-collection';
/**
 * Abstract class representing a FormAbstractCollectionDirective.
 */
export default class FormAbstractCollectionDirective extends Directive {
    get control(): FormAbstractCollection;
    onChanges(changes: Factory | Window): void;
    static meta: IFactoryMeta;
}
