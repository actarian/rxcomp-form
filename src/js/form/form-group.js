import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import FormAbstract from './form-abstract';
import FormControl from './form-control';
import FormStatus from './form-status';

export default class FormGroup extends FormAbstract {
	constructor(controls = {}, validators) {
		super(validators);
		this.controls = this.asControls(controls);
		this.initSubjects();
		this.initObservables();
		// this.status$.next(this);
	}

	initSubjects() {
		this.value$ = new BehaviorSubject(null);
		this.status$ = new BehaviorSubject(this);
		// VALUE
		const childrenValue$ = this.reduce_((observables, control) => {
			// console.log(observables, control);
			observables.push(control.value$);
			return observables;
		}, []);
		// console.log('childrenValue$', childrenValue$);
		this.childrenValue$ = combineLatest(childrenValue$).pipe(
			map(latest => this.value),
			// distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
			// this.dirty_ = this.any_('dirty_', true);
			/*
			map(merged => {
				const values = {};
				Object.keys(this.controls).forEach((key, i) => {
					values[key] = merged[i] || null;
				});
				return values;
			}),
			tap(value => {
				this.dirty_ = true;
				this.status$.next(this);
			}),
			*/
			shareReplay(1)
		);
		// STATUS
		const childrenStatus$ = this.reduce_((observables, control) => {
			// console.log(observables, control);
			observables.push(control.statusChanges$);
			return observables;
		}, []);
		// console.log('childrenStatus$', childrenStatus$);
		this.childrenStatus$ = combineLatest(childrenStatus$).pipe(
			/*
			tap(controls => {
				this.dirty_ = this.any_('dirty_', true);
			}),
			*/
			shareReplay(1)
		);

	}

	validate(value) {
		if (this.status === FormStatus.Disabled) {
			// this.errors = {};
			this.errors = [];
		} else {
			// this.errors = Object.assign({}, ...this.validators.map(x => x(value)));
			// this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
			let errors = this.validators.map(x => x(value)).filter(x => x !== null);
			errors = this.reduce_((errors, control) => {
				return errors.concat(control.errors);
			}, errors);
			this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
		}
		return this.errors;
	}

	asControl(control) {
		return control instanceof FormAbstract ? control : new FormControl(control, this.validators);
	}

	asControls(controls = {}) {
		Object.keys(controls).forEach(key => {
			controls[key] = this.asControl(controls[key]);
		});
		return controls;
	}

	forEach_(callback) {
		Object.keys(this.controls).forEach(k => callback(this.controls[k], k));
	}

	reduce_(callback, value) {
		this.forEach_((control, key) => {
			value = callback(value, control, key);
		});
		return value;
	}

	all_(key, value) {
		return this.reduce_((value, control) => {
			return value && control[key] === value;
		}, true);
	}

	any_(key, value) {
		return this.reduce_((value, control) => {
			return value || control[key] === value;
		}, false);
	}

	get(key) {
		return this.controls[key];
	}

	get touched() {
		return this.reduce_((value, control) => {
			return value && control.touched;
		}, true);
	}

	set touched(touched) {
		// this.touched_ = touched;
		this.forEach_(control => {
			control.touched = touched;
		});
		this.status$.next(this);
	}

	get value() {
		return this.reduce_((value, control, key) => {
			value[key] = control.value;
			return value;
		}, {});
	}

	set value(value) {}

}
