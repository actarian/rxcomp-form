import { BehaviorSubject } from 'rxjs';
import FormAbstract from './form-abstract';
import FormControl from './form-control';
import FormValidator from './validators/form-validator';
/**
 * Abstract class representing a form collection.
 */
export default class FormAbstractCollection extends FormAbstract {
    controls: any;
    changesChildren: BehaviorSubject<any>;
    /**
     * Create a FormAbstract.
     * @param controls an object containing controls.
     * @param validators a list of validators.
     */
    constructor(controls?: any, validators?: (FormValidator | FormValidator[]));
    initControl_(controlOrValue: FormAbstract | any, key: any): FormControl;
    private initControls_;
    protected initSubjects_(): void;
    protected switchSubjects_(): void;
    protected initObservables_(): void;
    validate(value: any): any[];
    protected forEach_(callback: Function): void;
    protected reduce_(callback: Function, result: any): any;
    protected all_(key: (keyof FormAbstract), value: any): boolean;
    protected any_(key: (keyof FormAbstract), value: any): boolean;
    get valid(): boolean;
    get invalid(): boolean;
    get pending(): boolean;
    get disabled(): boolean;
    get enabled(): boolean;
    get hidden(): boolean;
    get visible(): boolean;
    get submitted(): boolean;
    get dirty(): boolean;
    get pristine(): boolean;
    get touched(): boolean;
    get untouched(): boolean;
    set disabled(disabled: boolean);
    set hidden(hidden: boolean);
    set submitted(submitted: boolean);
    set touched(touched: boolean);
    get value(): {
        [key: string]: any;
    };
    set value(value: {
        [key: string]: any;
    });
    get errors(): {
        [key: string]: any;
    };
    set errors(errors: {
        [key: string]: any;
    });
    reset(): void;
    patch(value: {
        [key: string]: any;
    }): void;
    protected init(control: FormAbstract, key: any): void;
    get(key: any): FormAbstract;
    set(control: FormAbstract, key: any): void;
    add(control: FormAbstract, key: any): void;
    remove(control: FormAbstract): void;
    removeKey(key: any): void;
    /**
     * adds one or more FormValidator.
     * @param validators a list of validators.
     */
    addValidators(...validators: FormValidator[]): void;
    /**
     * replace one or more FormValidator.
     * @param validators a list of validators.
     */
    replaceValidators(...validators: FormValidator[]): void;
    /**
     * remove all FormValidator.
     */
    clearValidators(): void;
}
