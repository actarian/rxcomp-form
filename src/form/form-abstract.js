import { BehaviorSubject, merge, Subject } from "rxjs";
import { distinctUntilChanged, shareReplay, skip, tap } from 'rxjs/operators';
import FormStatus from './form-status';

export default class FormAbstract {
	constructor(validators = []) {
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
			tap(value => {
				// console.log('FormAbstract', value);
				this.dirty_ = true;
				// if (value === this.value) {
				this.statusSubject.next(this);
				// }
			}),
			shareReplay(1)
		);
		this.status$ = merge(this.statusSubject, this.statusChildren).pipe(
			// auditTime(1),
			tap(status => {
				// console.log(status);
				this.reduceValidators_();
			}),
			shareReplay(1)
		);
	}

	reduceValidators_() {
		return this.validate(this.value);
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
		this.statusSubject.next(this);
	}

	get value() { return this.value_; }

	set value(value) {
		// console.log('set value', value);
		this.value_ = value;
		this.valueSubject.next(value);
	}

	reset() {
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
