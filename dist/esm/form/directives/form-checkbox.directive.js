import { getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import FormAbstractCollectionDirective from './form-abstract-collection.directive';
import FormAbstractDirective from './form-abstract.directive';
/**
 * FormCheckboxDirective.
 * @example
 * <input type="checkbox" formControlName="privacy" [value]="true" requiredTrue />
 * @example
 * <input type="checkbox" [formControl]="control" [value]="true" requiredTrue />
 */
export default class FormCheckboxDirective extends FormAbstractDirective {
    onInit() {
        const node = getContext(this).node;
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
        fromEvent(node, 'change').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onChange(event));
        fromEvent(node, 'blur').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onBlur(event));
        // fromEvent<FocusEvent>(node, 'focus').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onFocus(event));
    }
    writeValue(value) {
        const node = getContext(this).node;
        value === this.value ? node.setAttribute('checked', value) : node.removeAttribute('checked');
        /*
        const checked = (node.value === value);
        if (node.checked !== checked) {
            node.checked = checked;
        }
        */
    }
    setDisabledState(disabled) {
        const node = getContext(this).node;
        node.disabled = disabled;
    }
    onChange(event) {
        const node = getContext(this).node;
        this.control.value = node.checked ? this.value : (this.value === true ? false : null);
    }
    onBlur(event) {
        this.control.touched = true;
    }
}
// onFocus(event) {}
FormCheckboxDirective.meta = {
    selector: 'input[type=checkbox][formControl],input[type=checkbox][formControlName]',
    inputs: ['formControl', 'formControlName', 'value'],
    hosts: { host: FormAbstractCollectionDirective },
};
/*

ATTRIBUTES
autocomplete	A string indicating the type of autocomplete functionality, if any, to allow on the input
autofocus		A Boolean which, if present, makes the input take focus when the form is presented
disabled		A Boolean attribute which is present if the input should be disabled
form			The id of the <form> of which the input is a member; if absent, the input is a member of the nearest containing form, or is not a member of a form at all
list			The id of a <datalist> element that provides a list of suggested values for the input
name			The input's name, to identify the input in the data submitted with the form's data
readonly		A Boolean attribute which, if true, indicates that the input cannot be edited
required		A Boolean which, if true, indicates that the input must have a value before the form can be submitted
tabindex		A numeric value providing guidance to the user agent as to the order in which controls receive focus when the user presses the Tab key
type			A string indicating which input type the <input> element represents
value			The input's current value

*/
