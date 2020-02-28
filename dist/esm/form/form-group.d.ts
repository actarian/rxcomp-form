import FormAbstract from './form-abstract';
import FormAbstractCollection from './form-abstract-collection';
import FormValidator from './validators/form-validator';
/**
 * Class representing a FormGroup.
 */
export default class FormGroup extends FormAbstractCollection {
    /**
     * Create a FormControl.
     * @example
     * const form = new FormGroup({
     * 	firstName: null,
     *  lastName: null,
     * });
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param controls an object containing controls.
     * @param validators a list of validators.
     */
    constructor(controls?: {
        [key: string]: FormAbstract | any;
    }, validators?: FormValidator | FormValidator[]);
}
/**
 * Shortcut for new FormGroup
 */
export declare function formGroup(controls?: {
    [key: string]: FormAbstract | any;
}, validators?: FormValidator | FormValidator[]): FormGroup;
