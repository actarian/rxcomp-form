import { BehaviorSubject, combineLatest, isObservable, merge, Observable, of } from "rxjs";
import { auditTime, distinctUntilChanged, map, shareReplay, skip, switchAll, switchMap, tap } from 'rxjs/operators';
import FormStatus from './models/form-status';
import FormValidator from "./validators/form-validator";

/**
 * @desc Abstract class representing a form control.
 * @abstract
 * @access public
 */
export default abstract class FormAbstract {

	public errors: any;

	name?: string;
	value_: any;
	submitted_: boolean;
	touched_: boolean;
	dirty_: boolean;
	status: FormStatus;

	validators: FormValidator[];
	value$: Observable<any>;
	status$: Observable<any>;
	changes$: Observable<any>;

	protected valueSubject: BehaviorSubject<any>;
	protected statusSubject: BehaviorSubject<FormAbstract>;
	protected validatorsSubject: BehaviorSubject<any>;

	/**
	 * Create a FormAbstract.
	 * @param {FormValidator|FormValidator[]} validators - A list of validators.
	 */
	constructor(validators?: (FormValidator | FormValidator[])) {
		this.validators = validators ? (Array.isArray(validators) ? validators : [validators]) : [];
	}

	/**
	 * @protected initialize subjects
	 * @return {void}
	 */
	protected initSubjects_(): void {
		/**
		 * @protected
		 */
		this.valueSubject = new BehaviorSubject(null);
		/**
		 * @protected
		 */
		this.statusSubject = new BehaviorSubject(this);
		/**
		 * @protected
		 */
		this.validatorsSubject = new BehaviorSubject(undefined).pipe(
			switchAll()
		) as BehaviorSubject<Observable<any>>;
		this.switchValidators_();
	}

	/**
	 * @private
	 */
	private switchValidators_(): void {
		const validatorParams: Observable<any>[] = this.validators.map(x => x.params$);
		let validatorParams$: Observable<any> = validatorParams.length ? combineLatest(validatorParams) : of(validatorParams);
		this.validatorsSubject.next(validatorParams$);
	}

	/**
	 * @protected initialize observables
	 * @return {void}
	 */
	protected initObservables_(): void {
		this.value$ = this.valueSubject.pipe(
			distinctUntilChanged(),
			skip(1),
			tap(() => {
				/**
				 * @private
				 */
				this.submitted_ = false;
				/**
				 * @private
				 */
				this.dirty_ = true;
				this.statusSubject.next(this);
			}),
			shareReplay(1)
		);
		this.status$ = merge(this.statusSubject, this.validatorsSubject).pipe(
			// auditTime(1),
			switchMap(() => this.validate$(this.value)),
			shareReplay(1)
		);
		this.changes$ = merge(this.value$, this.status$).pipe(
			map(() => this.value),
			auditTime(1),
			shareReplay(1)
		);
	}

	/**
	 * @param {null | string} value - the inner control value
	 * @return {Observable<errors>} an object with key, value errors
	 */
	validate$(value: any): Observable<{ [key: string]: any }> {
		if (this.status === FormStatus.Disabled || this.status === FormStatus.Hidden || this.submitted_ || !this.validators.length) {
			this.errors = {};
			if (this.status === FormStatus.Invalid) {
				this.status = FormStatus.Valid;
			}
			return of(this.errors);
		} else {
			return combineLatest(this.validators.map(x => {
				let result$ = x.validate(value);
				return isObservable(result$) ? result$ : of(result$);
			})).pipe(
				map(results => {
					this.errors = Object.assign({}, ...results);
					this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
					return this.errors;
				})
			);
		}
	}

	/**
	 * @return {boolean} the pending status
	 */
	get pending(): boolean { return this.status === FormStatus.Pending; }

	/**
	 * @return {boolean} the valid status
	 */
	get valid(): boolean { return this.status !== FormStatus.Invalid; }

	/**
	 * @return {boolean} the invalid status
	 */
	get invalid(): boolean { return this.status === FormStatus.Invalid; }

	/**
	 * @return {boolean} the disabled status
	 */
	get disabled(): boolean { return this.status === FormStatus.Disabled; }

	/**
	 * @return {boolean} the enabled status
	 */
	get enabled(): boolean { return this.status !== FormStatus.Disabled; }

	/**
	 * @return {boolean} the hidden status
	 */
	get hidden(): boolean { return this.status === FormStatus.Hidden; }

	/**
	 * @return {boolean} the visible status
	 */
	get visible(): boolean { return this.status !== FormStatus.Hidden; }

	/**
	 * @return {boolean} the submitted status
	 */
	get submitted(): boolean { return this.submitted_; }

	/**
	 * @return {boolean} the dirty status
	 */
	get dirty(): boolean { return this.dirty_; }

	/**
	 * @return {boolean} the pristine status
	 */
	get pristine(): boolean { return !this.dirty_; }

	/**
	 * @return {boolean} the touched status
	 */
	get touched(): boolean { return this.touched_; }

	/**
	 * @return {boolean} the untouched status
	 */
	get untouched(): boolean { return !this.touched_; }

	/**
	 * @param {boolean} disabled - the disabled state
	 * @return {void}
	 */
	set disabled(disabled: boolean) {
		if (disabled) {
			if (this.status !== FormStatus.Disabled) {
				this.status = FormStatus.Disabled;
				// this.value_ = null;
				this.dirty_ = false;
				this.touched_ = false;
				this.submitted_ = false;
				this.statusSubject.next(this);
			}
		} else {
			if (this.status === FormStatus.Disabled) {
				this.status = FormStatus.Pending;
				// this.value_ = null;
				this.dirty_ = false;
				this.touched_ = false;
				this.submitted_ = false;
				this.statusSubject.next(this);
			}
		}
	}

	/**
	 * @param {boolean} hidden - the hidden state
	 * @return {void}
	 */
	set hidden(hidden: boolean) {
		if (hidden) {
			if (this.status !== FormStatus.Hidden) {
				this.status = FormStatus.Hidden;
				// this.value_ = null;
				this.dirty_ = false;
				this.touched_ = false;
				this.submitted_ = false;
				this.statusSubject.next(this);
			}
		} else {
			if (this.status === FormStatus.Hidden) {
				this.status = FormStatus.Pending;
				// this.value_ = null;
				this.dirty_ = false;
				this.touched_ = false;
				this.submitted_ = false;
				this.statusSubject.next(this);
			}
		}
	}

	/**
	 * @param {boolean} submitted - the submitted state
	 * @return {void}
	 */
	set submitted(submitted: boolean) {
		this.submitted_ = submitted;
		this.statusSubject.next(this);
	}

	/**
	 * @param {boolean} touched - the touched state
	 * @return {void}
	 */
	set touched(touched: boolean) {
		/**
		 * @private
		 */
		this.touched_ = touched;
		this.statusSubject.next(this);
	}

	/**
	 * @return {any} inner value of the control
	 */
	get value(): any { return this.value_; }

	/**
	 * @param {any} value - a value
	 * @return {void}
	 */
	set value(value: any) {
		/**
		 * @private
		 */
		this.value_ = value;
		this.valueSubject.next(value);
	}

	/**
	 * @param {null | FormStatus} status - optional FormStatus
	 * @return {void}
	 */
	reset(status?: FormStatus): void {
		this.status = status || FormStatus.Pending;
		this.value_ = null;
		this.dirty_ = false;
		this.touched_ = false;
		this.submitted_ = false;
		this.statusSubject.next(this);
	}

	/**
	 * @param {null | string} value - a value
	 * @return {void}
	 */
	patch(value: any): void {
		this.value_ = value;
		this.dirty_ = true;
		this.submitted_ = false;
		this.statusSubject.next(this);
	}

	/**
	 * adds one or more FormValidator.
	 * @param {...FormValidator[]} validators - A list of validators.
	 */
	addValidators(...validators: any[]): void {
		this.validators.push(...validators);
		this.switchValidators_();
	}

	/**
	 * replace one or more FormValidator.
	 * @param {...FormValidator[]} validators - A list of validators.
	 */
	replaceValidators(...validators: any[]): void {
		this.validators = validators;
		this.switchValidators_();
	}

	/**
	 * remove all FormValidator.
	 */
	clearValidators(): void {
		this.validators = [];
		this.switchValidators_();
	}

}
