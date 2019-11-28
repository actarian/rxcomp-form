import { BehaviorSubject, merge, Subject } from "rxjs";
import { distinctUntilChanged, shareReplay, skip, tap } from 'rxjs/operators';
import FormStatus from './form-status';

export default class FormAbstract {
	constructor(validators = []) {
		this.validators = validators;
		// this.errors = {};
		this.errors = [];
	}

	initSubjects() {
		this.value$ = new BehaviorSubject(null);
		this.status$ = new BehaviorSubject(this);
		this.childrenValue$ = new Subject();
		this.childrenStatus$ = new Subject();
	}

	initObservables() {
		this.valueChanges$ = merge(this.value$, this.childrenValue$).pipe(
			distinctUntilChanged(),
			skip(1),
			tap(value => {
				this.dirty_ = true;
				if (value === this.value) {
					this.status$.next(this);
				}
			}),
			shareReplay(1)
		);
		this.statusChanges$ = merge(this.status$, this.childrenStatus$).pipe(
			// auditTime(1),
			tap(status => {
				this.reduceValidators();
			}),
			shareReplay(1)
		);
	}

	reduceValidators() {
		return [];
	}

	validate(value) {
		if (this.status === FormStatus.Disabled) {
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

	get valid() { return this.status === FormStatus.Valid; }
	get invalid() { return this.status === FormStatus.Invalid; }
	get pending() { return this.status === FormStatus.Pending; }
	get disabled() { return this.status === FormStatus.Disabled; }
	get enabled() { return this.status !== FormStatus.Disabled; }
	get dirty() { return this.dirty_; }
	get pristine() { return !this.dirty_; }
	get touched() { return this.touched_; }
	get untouched() { return !this.touched_; }

	set touched(touched) {
		this.touched_ = touched;
		this.status$.next(this);
	}

	get value() { return this.value_; }

	set value(value) {
		this.value_ = value;
		this.value$.next(value);
	}

}
