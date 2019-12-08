import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, shareReplay, switchAll } from 'rxjs/operators';
import FormAbstract from './form-abstract';
import FormControl from './form-control';
import FormStatus from './models/form-status';

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
			this.init(control, key);
		});
		return controls;
	}

	initSubjects_() {
		/*
		this.valueSubject = new BehaviorSubject(null);
		const valueChildren = this.reduce_((result, control) => {
			result.push(control.value$);
			return result;
		}, []);
		this.valueChildren = combineLatest(valueChildren).pipe(
			map(latest => this.value),
			shareReplay(1)
		);
		this.statusSubject = new BehaviorSubject(this);
		const statusChildren = this.reduce_((result, control) => {
			result.push(control.status$);
			return result;
		}, []);
		this.statusChildren = combineLatest(statusChildren).pipe(
			shareReplay(1)
		);
		*/
		/*
		const changesChildren = this.reduce_((result, control) => {
			result.push(control.changes$);
			return result;
		}, []);
		this.changesChildren = combineLatest(changesChildren).pipe(
			shareReplay(1)
		);
		*/
		this.changesChildren = new BehaviorSubject().pipe(
			switchAll()
		);
		this.switchSubjects_();
	}

	switchSubjects_() {
		const changesChildren = this.reduce_((result, control) => {
			result.push(control.changes$);
			return result;
		}, []);
		let changesChildren$ = changesChildren.length ? combineLatest(changesChildren) : of (changesChildren);
		this.changesChildren.next(changesChildren$);
	}

	initObservables_() {
		/*
		this.value$ = merge(this.valueSubject, this.valueChildren).pipe(
			distinctUntilChanged(),
			skip(1),
			tap(() => {
				this.statusSubject.next(this);
			}),
			shareReplay(1)
		);
		this.status$ = merge(this.statusSubject, this.statusChildren).pipe(
			tap(() => {
				this.reduceValidators_();
			}),
			shareReplay(1)
		);
		*/
		this.changes$ = this.changesChildren.pipe(
			map(() => this.value),
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
			this.errors = this.reduce_((result, control) => {
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

	get valid() { return this.all_('valid', true); }
	get invalid() { return this.any_('invalid', true); }
	get pending() { return this.any_('pending', true); }
	get disabled() { return this.all_('disabled', true); }
	get enabled() { return this.any_('enabled', true); }
	get submitted() { return this.all_('submitted', true); }
	get dirty() { return this.any_('dirty', true); }
	get pristine() { return this.all_('pristine', true); }
	get touched() { return this.all_('touched', true); }
	get untouched() { return this.any_('untouched', true); }

	set disabled(disabled) {
		this.forEach_(control => {
			control.disabled = disabled;
		});
	}

	set submitted(submitted) {
		this.forEach_(control => {
			control.submitted = submitted;
		});
	}

	set touched(touched) {
		this.forEach_(control => {
			control.touched = touched;
		});
	}

	get value() {
		return this.reduce_((result, control, key) => {
			result[key] = control.value;
			return result;
		}, {});
	}

	set value(value) {
		this.forEach_((control, key) => {
			control.value = value[key];
		});
	}

	reset() {
		this.forEach_(control => control.reset());
	}

	patch(value) {
		if (value) {
			this.forEach_((control, key) => {
				control.patch(value[key]);
			});
		}
	}

	init(control, key) {
		this.controls[key] = this.initControl_(control);
	}

	get(key) {
		return this.controls[key];
	}

	set(control, key) {
		delete(this.controls[key]);
		this.controls[key] = this.initControl_(control);
		this.switchSubjects_();
	}

	// !!! needed?
	add(control, key) {
		this.controls[key] = this.initControl_(control);
		this.switchSubjects_();
	}

	remove(control) {
		const key = Object.keys(this.controls).find(key => this.controls[key] === control ? key : null);
		if (key) {
			this.removeKey(key);
		}
	}

	removeKey(key) {
		const changed = this.controls[key] !== undefined;
		delete(this.controls[key]);
		if (changed) {
			this.switchSubjects_();
		}
	}

}
