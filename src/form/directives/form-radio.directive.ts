import { getContext, IFactoryMeta } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
import FormAbstractDirective from './form-abstract.directive';

/**
 * FormRadioDirective.
 * @example
 * <input type="radio" [formControl]="control" name="radioGroup" value="one" />
 * <input type="radio" [formControl]="control" name="radioGroup" value="two" />
 * <input type="radio" [formControl]="control" name="radioGroup" value="three" />
 */
export default class FormRadioDirective extends FormAbstractDirective {

	onInit() {
		const node = getContext(this).node as HTMLInputElement;
		// log(node.getAttributeNode('formControl').value);
		// log('name', node.name);
		// this.onChange = this.onChange.bind(this);
		// this.onBlur = this.onBlur.bind(this);
		// this.onFocus = this.onFocus.bind(this);
		// node.addEventListener('input', this.onChange);
		// node.addEventListener('change', this.onChange);
		// node.addEventListener('blur', this.onBlur);
		// node.addEventListener('focus', this.onFocus);
		// fromEvent<Event>(node, 'input').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onChange(event));
		fromEvent<Event>(node, 'change').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onChange(event));
		fromEvent<FocusEvent>(node, 'blur').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onBlur(event));
		// fromEvent<FocusEvent>(node, 'focus').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onFocus(event));
	}

	writeValue(value: any) {
		const node = getContext(this).node as HTMLInputElement;
		node.checked = (node.value === value);
	}

	setDisabledState(disabled: boolean) {
		const node = getContext(this).node as HTMLInputElement;
		node.disabled = disabled;
	}

	onChange(event: Event) {
		const node = getContext(this).node as HTMLInputElement;
		if (node.checked) {
			this.control.value = node.value;
		}
	}

	onBlur(event: FocusEvent) {
		this.control.touched = true;
	}

	static meta: IFactoryMeta = {
		selector: 'input[type=radio][formControl],input[type=radio][formControlName]',
		inputs: ['formControl', 'formControlName'],
		hosts: { host: FormAbstractCollectionDirective },
	};

}
