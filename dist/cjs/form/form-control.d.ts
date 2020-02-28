import FormAbstract from "./form-abstract";
import FormValidator from "./validators/form-validator";
/**
 * Class representing a FormControl.
 */
export default class FormControl extends FormAbstract {
    /**
     * Create a FormControl.
     * @example
     * const form = new FormControl(null);
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param value The value of the control.
     * @param validators a list of validators.
     */
    constructor(value?: any, validators?: FormValidator | FormValidator[]);
}
/** Shortcut for new FormControl. */
export declare function formControl(value?: any, validators?: FormValidator | FormValidator[]): FormControl;
