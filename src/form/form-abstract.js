import { BehaviorSubject, combineLatest, isObservable, merge, of } from "rxjs";
import { auditTime, distinctUntilChanged, map, shareReplay, skip, switchAll, switchMap, tap } from 'rxjs/operators';
import FormStatus from './models/form-status';

/**
 * @desc Abstract class representing a form control.
 * @abstract
 * @access public
 */
export default class FormAbstract {
	/**
	 * Create a FormAbstract.
	 * @param {FormValidator|FormValidator[]} validators - A list of validators.
	 */
	constructor(validators) {
		this.validators = validators ? (Array.isArray(validators) ? validators : [validators]) : [];
	}

	/**
	 * @private initialize subjects
	 * @return {void}
	 */
	initSubjects_() {
		/**
		 * @private
		 */
		this.valueSubject = new BehaviorSubject(null);
		/**
		 * @private
		 */
		this.statusSubject = new BehaviorSubject(this);
		/**
		 * @private
		 */
		this.validatorsSubject = new BehaviorSubject().pipe(
			switchAll()
		);
		this.switchValidators_();
	}

	/**
	 * @private
	 */
	switchValidators_() {
		const validators = this.validators.map(x => x.params$);
		let validators$ = validators.length ? combineLatest(validators) : of (validators);
		this.validatorsSubject.next(validators$);
	}

	/**
	 * @private initialize observables
	 * @return {void}
	 */
	initObservables_() {
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
		const changes = {};
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
	validate$(value) {
		if (this.status === FormStatus.Disabled || this.submitted_ || !this.validators.length) {
			this.errors = {};
			return of(this.errors);
		} else {
			return combineLatest(this.validators.map(x => {
				let result$ = x.validate(value);
				return isObservable(result$) ? result$ : of (result$);
			})).pipe(
				map(results => {
					this.errors = Object.assign({}, ...results);
					this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
				})
			);
		}
		/*
		if (this.status === FormStatus.Disabled || this.submitted_) {
			this.errors = {};
		} else {
			this.errors = Object.assign({}, ...this.validators.map(x => x.validate$(value)));
			this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
			// this.errors = this.validators.map(x => x(value)).filter(x => x !== null);
			// this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
		}
		return this.errors;
		*/
	}

	/**
	 * @return {boolean} the pending status
	 */
	get pending() { return this.status === FormStatus.Pending; }

	/**
	 * @return {boolean} the valid status
	 */
	get valid() { return this.status === FormStatus.Valid; }

	/**
	 * @return {boolean} the invalid status
	 */
	get invalid() { return this.status === FormStatus.Invalid; }

	/**
	 * @return {boolean} the disabled status
	 */
	get disabled() { return this.status === FormStatus.Disabled; }

	/**
	 * @return {boolean} the enabled status
	 */
	get enabled() { return this.status !== FormStatus.Disabled; }

	/**
	 * @return {boolean} the submitted status
	 */
	get submitted() { return this.submitted_; }

	/**
	 * @return {boolean} the dirty status
	 */
	get dirty() { return this.dirty_; }

	/**
	 * @return {boolean} the pristine status
	 */
	get pristine() { return !this.dirty_; }

	/**
	 * @return {boolean} the touched status
	 */
	get touched() { return this.touched_; }

	/**
	 * @return {boolean} the untouched status
	 */
	get untouched() { return !this.touched_; }

	/**
	 * @param {boolean} disabled - the disabled state
	 * @return {void}
	 */
	set disabled(disabled) {
		if (disabled) {
			this.status = FormStatus.Disabled;
		}
		this.statusSubject.next(this);
	}

	/**
	 * @param {boolean} submitted - the submitted state
	 * @return {void}
	 */
	set submitted(submitted) {
		this.submitted_ = submitted;
		this.statusSubject.next(this);
	}

	/**
	 * @param {boolean} touched - the touched state
	 * @return {void}
	 */
	set touched(touched) {
		/**
		 * @private
		 */
		this.touched_ = touched;
		this.statusSubject.next(this);
	}

	/**
	 * @return {null | string} inner value of the control
	 */
	get value() { return this.value_; }

	/**
	 * @param {null | string} value - a value
	 * @return {void}
	 */
	set value(value) {
		// console.log('set value', value);
		/**
		 * @private
		 */
		this.value_ = value;
		this.valueSubject.next(value);
	}

	/**
	 * @return {void}
	 */
	reset() {
		this.status = FormStatus.Pending;
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
	patch(value) {
		this.value_ = value;
		this.dirty_ = true;
		this.submitted_ = false;
		this.statusSubject.next(this);
	}

	/**
	 * adds one or more FormValidator.
	 * @param {...FormValidator[]} validators - A list of validators.
	 */
	addValidators(...validators) {
		this.validators.push(...validators);
		this.switchValidators_();
	}

}
