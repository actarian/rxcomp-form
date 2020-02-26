import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay, switchAll } from 'rxjs/operators';
import FormAbstract from './form-abstract';
import FormControl from './form-control';
import FormStatus from './models/form-status';
import FormValidator from './validators/form-validator';

/**
 * @desc Abstract class representing a form collection.
 * @abstract
 * @access public
 */
export default class FormAbstractCollection extends FormAbstract {

	controls: any;
	changesChildren: BehaviorSubject<any>;

	/**
	 * Create a FormAbstract.
	 * @param {Map<string, any|FormAbstract>} controls - An object containing controls.
	 * @param {FormValidator[]} validators - A list of validators.
	 */
	constructor(controls?: any, validators?: (FormValidator | FormValidator[])) {
		super(validators);
		this.controls = controls;
		this.initControls_();
		this.initSubjects_();
		this.initObservables_();
	}

	/**
	 * @private
	 */
	initControl_(controlOrValue: FormAbstract | any, key: any): FormControl {
		const control: FormControl = controlOrValue instanceof FormAbstract ? controlOrValue : new FormControl(controlOrValue);
		control.addValidators(...this.validators);
		control.name = key;
		return control;
	}

	/**
	 * @private
	 */
	private initControls_(): { [key: string]: FormControl } {
		this.forEach_((control, key) => {
			this.init(control, key);
		});
		return this.controls;
	}

	/**
	 * @protected
	 */
	protected initSubjects_(): void {
		this.changesChildren = new BehaviorSubject<any>(undefined).pipe(
			switchAll()
		) as BehaviorSubject<Observable<any>>;
		this.switchSubjects_();
	}

	/**
	 * @protected
	 */
	protected switchSubjects_(): void {
		const changesChildren = this.reduce_((result, control) => {
			result.push(control.changes$);
			return result;
		}, []);
		let changesChildren$ = changesChildren.length ? combineLatest(changesChildren) : of(changesChildren);
		this.changesChildren.next(changesChildren$);
	}

	/**
	 * @protected
	 */
	protected initObservables_(): void {
		this.changes$ = this.changesChildren.pipe(
			map(() => this.value),
			shareReplay(1)
		);
	}

	validate(value): any[] {
		let errors;
		if (this.status === FormStatus.Disabled || this.status === FormStatus.Hidden) {
			// this.errors = {};
			errors = [];
		} else {
			// this.errors = Object.assign({}, ...this.validators.map(x => x(value)));
			// this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
			let errors_ = this.validators.map(x => x.validate(value)).filter(x => x !== null);
			errors = this.reduce_((result, control) => {
				return result.concat(control.errors);
			}, errors_);
			this.status = errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
		}
		return errors;
	}

	/**
	 * @protected
	 */
	protected forEach_(callback: Function): void {
		Object.keys(this.controls).forEach(key => callback(this.controls[key], key));
	}

	/**
	 * @protected
	 */
	protected reduce_(callback: Function, result: any): any {
		this.forEach_((control: FormAbstract, key: any) => {
			result = callback(result, control, key);
		});
		return result;
	}

	/**
	 * @protected
	 */
	protected all_(key: any, value: any): boolean {
		return this.reduce_((result: boolean, control: FormAbstract) => {
			return result && control[key] === value;
		}, true);
	}

	/**
	 * @protected
	 */
	protected any_(key: any, value: any): boolean {
		return this.reduce_((result: boolean, control: FormAbstract) => {
			return result || control[key] === value;
		}, false);
	}

	get valid(): boolean { return this.all_('valid', true); }
	get invalid(): boolean { return this.any_('invalid', true); }
	get pending(): boolean { return this.any_('pending', true); }
	get disabled(): boolean { return this.all_('disabled', true); }
	get enabled(): boolean { return this.any_('enabled', true); }
	get hidden(): boolean { return this.all_('hidden', true); }
	get visible(): boolean { return this.any_('visible', true); }
	get submitted(): boolean { return this.all_('submitted', true); }
	get dirty(): boolean { return this.any_('dirty', true); }
	get pristine(): boolean { return this.all_('pristine', true); }
	get touched(): boolean { return this.all_('touched', true); }
	get untouched(): boolean { return this.any_('untouched', true); }

	set disabled(disabled: boolean) {
		this.forEach_((control: FormAbstract) => {
			control.disabled = disabled;
		});
	}

	set hidden(hidden: boolean) {
		this.forEach_((control: FormAbstract) => {
			control.hidden = hidden;
		});
	}

	set submitted(submitted: boolean) {
		this.forEach_((control: FormAbstract) => {
			control.submitted = submitted;
		});
	}

	set touched(touched: boolean) {
		this.forEach_((control: FormAbstract) => {
			control.touched = touched;
		});
	}

	get value(): { [key: string]: any } {
		return this.reduce_((result: { [key: string]: any }, control: FormAbstract, key: string) => {
			result[key] = control.value;
			return result;
		}, {});
	}

	set value(value: { [key: string]: any }) {
		this.forEach_((control: FormAbstract, key: string) => {
			control.value = value[key];
		});
	}

	get errors(): { [key: string]: any } {
		return this.reduce_((result: { [key: string]: any }, control: FormAbstract) => {
			return Object.assign(result, control.errors);
		}, {});
	}

	reset(): void {
		this.forEach_((control: FormAbstract) => control.reset());
	}

	patch(value: { [key: string]: any }): void {
		if (value) {
			this.forEach_((control: FormAbstract, key: string) => {
				if (value[key] != undefined) { // !!! keep != loose inequality
					control.patch(value[key]);
				}
			});
		}
	}

	protected init(control: FormAbstract, key: any): void {
		this.controls[key] = this.initControl_(control, key);
	}

	get(key: any): FormAbstract {
		return this.controls[key];
	}

	set(control: FormAbstract, key: any): void {
		delete (this.controls[key]);
		this.controls[key] = this.initControl_(control, key);
		this.switchSubjects_();
	}

	// !!! needed?
	add(control: FormAbstract, key: any): void {
		this.controls[key] = this.initControl_(control, key);
		this.switchSubjects_();
	}

	remove(control: FormAbstract): void {
		const key: string = Object.keys(this.controls).find((key: string) => this.controls[key] === control ? key : null);
		if (key) {
			this.removeKey(key);
		}
	}

	removeKey(key: any): void {
		const exhist: boolean = this.controls[key] !== undefined;
		delete (this.controls[key]);
		if (exhist) {
			this.switchSubjects_();
		}
	}

	/**
	 * adds one or more FormValidator.
	 * @param {...FormValidator[]} validators - A list of validators.
	 */
	addValidators(...validators: FormValidator[]): void {
		this.forEach_((control: FormAbstract) => control.addValidators(...validators));
	}

	/**
	 * replace one or more FormValidator.
	 * @param {...FormValidator[]} validators - A list of validators.
	 */
	replaceValidators(...validators: FormValidator[]): void {
		this.forEach_((control: FormAbstract) => control.replaceValidators(...validators));
	}

	/**
	 * remove all FormValidator.
	 */
	clearValidators(): void {
		this.forEach_((control: FormAbstract) => control.clearValidators());
	}

}
