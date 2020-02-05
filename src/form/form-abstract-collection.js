import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, shareReplay, switchAll } from 'rxjs/operators';
import FormAbstract from './form-abstract';
import FormControl from './form-control';
import FormStatus from './models/form-status';

/**
 * @desc Abstract class representing a form collection.
 * @abstract
 * @access public
 */
export default class FormAbstractCollection extends FormAbstract {
	/**
	 * Create a FormAbstract.
	 * @param {Map<string, any|FormAbstract>} controls - An object containing controls.
	 * @param {FormValidator[]} validators - A list of validators.
	 */
	constructor(controls, validators) {
		super(validators);
		this.controls = controls;
		this.initControls_(controls);
		this.initSubjects_();
		this.initObservables_();
	}

	/**
	 * @private
	 */
	initControl_(control, key) {
		control = control instanceof FormAbstract ? control : new FormControl(control);
		control.addValidators(...this.validators);
		control.name = key;
		return control;
	}

	/**
	 * @private
	 */
	initControls_(controls) {
		this.forEach_((control, key) => {
			this.init(control, key);
		});
		return controls;
	}

	/**
	 * @private
	 */
	initSubjects_() {
		this.changesChildren = new BehaviorSubject().pipe(
			switchAll()
		);
		this.switchSubjects_();
	}

	/**
	 * @private
	 */
	switchSubjects_() {
		const changesChildren = this.reduce_((result, control) => {
			result.push(control.changes$);
			return result;
		}, []);
		let changesChildren$ = changesChildren.length ? combineLatest(changesChildren) : of (changesChildren);
		this.changesChildren.next(changesChildren$);
	}

	/**
	 * @private
	 */
	initObservables_() {
		this.changes$ = this.changesChildren.pipe(
			map(() => this.value),
			shareReplay(1)
		);
	}

	validate(value) {
		if (this.status === FormStatus.Disabled || this.status === FormStatus.Hidden) {
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

	/**
	 * @private
	 */
	forEach_(callback) {
		Object.keys(this.controls).forEach(key => callback(this.controls[key], key));
	}

	/**
	 * @private
	 */
	reduce_(callback, result) {
		this.forEach_((control, key) => {
			result = callback(result, control, key);
		});
		return result;
	}

	/**
	 * @private
	 */
	all_(key, value) {
		return this.reduce_((result, control) => {
			return result && control[key] === value;
		}, true);
	}

	/**
	 * @private
	 */
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
	get hidden() { return this.all_('hidden', true); }
	get visible() { return this.any_('visible', true); }
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

	set hidden(hidden) {
		this.forEach_(control => {
			control.hidden = hidden;
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

	get errors() {
		return this.reduce_((result, control) => {
			return Object.assign(result, control.errors);
		}, {});
	}

	reset() {
		this.forEach_(control => control.reset());
	}

	patch(value) {
		if (value) {
			this.forEach_((control, key) => {
				if (value[key] != undefined) { // !!! keep != loose inequality
					control.patch(value[key]);
				}
			});
		}
	}

	init(control, key) {
		this.controls[key] = this.initControl_(control, key);
	}

	get(key) {
		return this.controls[key];
	}

	set(control, key) {
		delete(this.controls[key]);
		this.controls[key] = this.initControl_(control, key);
		this.switchSubjects_();
	}

	// !!! needed?
	add(control, key) {
		this.controls[key] = this.initControl_(control, key);
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

	/**
	 * adds one or more FormValidator.
	 * @param {...FormValidator[]} validators - A list of validators.
	 */
	addValidators(...validators) {
		this.forEach_(control => control.addValidators(...validators));
	}

	/**
	 * replace one or more FormValidator.
	 * @param {...FormValidator[]} validators - A list of validators.
	 */
	replaceValidators(...validators) {
		this.forEach_(control => control.replaceValidators(...validators));
	}

	/**
	 * remove all FormValidator.
	 */
	clearValidators() {
		this.forEach_(control => control.clearValidators());
	}

}
