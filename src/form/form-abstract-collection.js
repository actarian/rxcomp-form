import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import FormAbstract from './form-abstract';
import FormControl from './form-control';
import FormStatus from './form-status';

export default class FormAbstractCollection extends FormAbstract {

	constructor(controls, validators) {
		super(validators);
		this.controls = controls;
		this.initControls_(controls);
		this.initSubjects_();
		this.initObservables_();
		// this.statusSubject.next(this);
	}

	initControl_(control) {
		return control instanceof FormAbstract ? control : new FormControl(control, this.validators);
	}

	initControls_(controls) {
		this.forEach_((control, key) => {
			this.set(this.initControl_(control), key);
		});
		return controls;
	}

	initSubjects_() {
		this.valueSubject = new BehaviorSubject(null);
		const valueChildren = this.reduce_((result, control) => {
			result.push(control.valueSubject);
			return result;
		}, []);
		this.valueChildren = combineLatest(valueChildren).pipe(
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
				this.statusSubject.next(this);
			}),
			*/
			shareReplay(1)
		);
		this.statusSubject = new BehaviorSubject(this);
		const statusChildren = this.reduce_((result, control) => {
			result.push(control.status$);
			return result;
		}, []);
		this.statusChildren = combineLatest(statusChildren).pipe(
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
			errors = this.reduce_((result, control) => {
				return result.concat(control.errors);
			}, errors);
			this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
		}
		return this.errors;
	}

	forEach_(callback) {
		Object.keys(this.controls).forEach(key => callback(this.controls[key], key));
	}

	reduce_(callback, result) {
		this.forEach_((control, key) => {
			result = callback(result, control, key);
		});
		return result;
	}

	all_(key, value) {
		return this.reduce_((result, control) => {
			return result && control[key] === value;
		}, true);
	}

	any_(key, value) {
		return this.reduce_((result, control) => {
			return result || control[key] === value;
		}, false);
	}

	get(key) {
		return this.controls[key];
	}

	set(control, key) {
		this.controls[key] = control;
	}

	get touched() {
		return this.reduce_((result, control) => {
			return result && control.touched;
		}, true);
	}

	set touched(touched) {
		// this.touched_ = touched;
		this.forEach_(control => {
			control.touched = touched;
		});
		this.statusSubject.next(this);
	}

	get value() {
		return this.reduce_((result, control, key) => {
			result[key] = control.value;
			return result;
		}, {});
	}

	set value(value) {}

}
