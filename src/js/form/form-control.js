import FormAbstract from "./form-abstract";

export default class FormControl extends FormAbstract {
	constructor(value = null, validators) {
		super(validators);
		this.value_ = value;
		this.initSubjects();
		this.initObservables();
		this.status$.next(this);
	}

	reduceValidators() {
		return this.validate(this.value);
	}
}
