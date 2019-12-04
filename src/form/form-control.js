import FormAbstract from "./form-abstract";

export default class FormControl extends FormAbstract {

	constructor(value = null, validators) {
		super(validators);
		this.value_ = value;
		this.initSubjects_();
		this.initObservables_();
		this.statusSubject.next(this);
	}

}

export function formControl(value, validators) {
	return new FormControl(value, validators);
}
