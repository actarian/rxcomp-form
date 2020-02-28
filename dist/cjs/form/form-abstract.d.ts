import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import FormStatus from './models/form-status';
import FormValidator from "./validators/form-validator";
/**
 * Abstract class representing a form control.
 */
export default abstract class FormAbstract {
    errors: any;
    name?: string;
    value_: any;
    submitted_: boolean;
    touched_: boolean;
    dirty_: boolean;
    status?: FormStatus;
    validators: FormValidator[];
    protected valueSubject: BehaviorSubject<any>;
    protected statusSubject: BehaviorSubject<null>;
    protected validatorsSubject: ReplaySubject<Observable<any[]>>;
    value$: Observable<any>;
    status$: Observable<{
        [key: string]: any;
    }>;
    changes$: Observable<any>;
    /**
     * Create a FormAbstract.
     * @param validators a list of validators.
     */
    constructor(validators?: (FormValidator | FormValidator[]));
    /**
     * initialize subjects
     */
    protected initSubjects_(): void;
    private switchValidators_;
    /**
     * initialize observables
     */
    protected initObservables_(): void;
    /**
     * @param value the inner control value
     * @return an object with key, value errors
     */
    validate$(value: any): Observable<{
        [key: string]: any;
    }>;
    /**
     * @return the pending status
     */
    get pending(): boolean;
    /**
     * @return the valid status
     */
    get valid(): boolean;
    /**
     * @return the invalid status
     */
    get invalid(): boolean;
    /**
     * @return the disabled status
     */
    get disabled(): boolean;
    /**
     * @return the enabled status
     */
    get enabled(): boolean;
    /**
     * @return the hidden status
     */
    get hidden(): boolean;
    /**
     * @return the visible status
     */
    get visible(): boolean;
    /**
     * @return the submitted status
     */
    get submitted(): boolean;
    /**
     * @return the dirty status
     */
    get dirty(): boolean;
    /**
     * @return the pristine status
     */
    get pristine(): boolean;
    /**
     * @return the touched status
     */
    get touched(): boolean;
    /**
     * @return the untouched status
     */
    get untouched(): boolean;
    /**
     * @param disabled the disabled state
     */
    set disabled(disabled: boolean);
    get flags(): {
        [key: string]: boolean;
    };
    /**
     * @param hidden the hidden state
     */
    set hidden(hidden: boolean);
    /**
     * @param submitted the submitted state
     */
    set submitted(submitted: boolean);
    /**
     * @param touched the touched state
     */
    set touched(touched: boolean);
    /**
     * @return inner value of the control
     */
    get value(): any;
    /**
     * @param value a value
     */
    set value(value: any);
    /**
     * @param status optional FormStatus
     */
    reset(status?: FormStatus): void;
    /**
     * @param value a value
     */
    patch(value: any): void;
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
