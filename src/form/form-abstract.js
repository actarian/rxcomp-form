import { BehaviorSubject, merge, Subject } from "rxjs";
import { distinctUntilChanged, map, shareReplay, skip, tap } from 'rxjs/operators';
import FormStatus from './form-status';

export default class FormAbstract {
	constructor(validators = []) {
		this.status = FormStatus.Pending;
		this.validators = validators;
		// this.errors = {};
		this.errors = [];
	}

	initSubjects_() {
		this.valueSubject = new BehaviorSubject(null);
		this.valueChildren = new Subject();
		this.statusSubject = new BehaviorSubject(this);
		this.statusChildren = new Subject();
	}

	initObservables_() {
		this.value$ = merge(this.valueSubject, this.valueChildren).pipe(
			distinctUntilChanged(),
			skip(1),
			tap(any => {
				this.submitted_ = false;
				this.dirty_ = true;
				this.statusSubject.next(this);
			}),
			shareReplay(1)
		);
		this.status$ = merge(this.statusSubject, this.statusChildren).pipe(
			// auditTime(1),
			tap(any => {
				this.reduceValidators_();
			}),
			shareReplay(1)
		);
		this.changes$ = merge(this.value$, this.status$).pipe(
			map(any => this.value),
			shareReplay(1)
		);
	}

	reduceValidators_() {
		return this.validate(this.value);
	}

	validate(value) {
		if (this.status === FormStatus.Disabled || this.submitted_) {
			// this.errors = {};
			this.errors = [];
		} else {
			// this.errors = Object.assign({}, ...this.validators.map(x => x(value)));
			// this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
			this.errors = this.validators.map(x => x(value)).filter(x => x !== null);
			this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
		}
		return this.errors;
	}

	get pending() { return this.status === FormStatus.Pending; }
	get valid() { return this.status === FormStatus.Valid; }
	get invalid() { return this.status === FormStatus.Invalid; }
	get disabled() { return this.status === FormStatus.Disabled; }
	get enabled() { return this.status !== FormStatus.Disabled; }
	get submitted() { return this.submitted_; }
	get dirty() { return this.dirty_; }
	get pristine() { return !this.dirty_; }
	get touched() { return this.touched_; }
	get untouched() { return !this.touched_; }

	set disabled(disabled) {
		if (disabled) {
			this.status = FormStatus.Disabled;
		} else {
			this.reduceValidators_();
		}
		this.statusSubject.next(this);
	}

	set submitted(submitted) {
		this.submitted_ = submitted;
		this.statusSubject.next(this);
	}

	set touched(touched) {
		this.touched_ = touched;
		this.statusSubject.next(this);
	}

	get value() { return this.value_; }

	set value(value) {
		// console.log('set value', value);
		this.value_ = value;
		this.valueSubject.next(value);
	}

	reset() {
		this.status = FormStatus.Pending;
		this.value_ = null;
		this.dirty_ = false;
		this.touched_ = false;
		this.statusSubject.next(this);
	}

	patch(value) {
		this.value_ = value;
		this.dirty_ = true;
		this.statusSubject.next(this);
	}

}
