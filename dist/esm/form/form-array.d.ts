import FormAbstract from './form-abstract';
import FormAbstractCollection from './form-abstract-collection';
import FormValidator from './validators/form-validator';
/**
 * Class representing a FormArray.
 */
export default class FormArray extends FormAbstractCollection {
    /**
     * Create a FormArray.
     * @example
     * const form = new FormArray([null, null, null]);
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param controls an array containing controls.
     * @param validators a list of validators.
     */
    constructor(controls?: (FormAbstract | any)[], validators?: (FormValidator | FormValidator[]));
    forEach_(callback: (control: FormAbstract, key: number) => any): void;
    get value(): any[];
    get length(): number;
    protected init(control: FormAbstract, key: number): void;
    set(control: FormAbstract, key: number): void;
    add(control: FormAbstract, key: number): void;
    push(control: FormAbstract): void;
    insert(control: FormAbstract, key: number): void;
    remove(control: FormAbstract): void;
    removeKey(key: number): void;
    at(key: number): any;
}
/**
 * Shortcut for new FormArray
 */
export declare function formArray(controls?: (FormAbstract | any)[], validators?: FormValidator | FormValidator[]): FormArray;
