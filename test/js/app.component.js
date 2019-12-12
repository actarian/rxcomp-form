import { Component } from 'rxcomp';
import { FormArray, FormGroup, RequiredValidator } from '../../src/rxcomp-form';

export default class AppComponent extends Component {

	onInit() {
		const form = new FormGroup({
			firstName: null,
			lastName: null,
			email: null,
			country: null,
			evaluate: null,
			privacy: null,
			items: new FormArray([null, null, null], [RequiredValidator()]),
		});

		form.patch({
			firstName: 'Jhon',
			lastName: 'Appleseed',
			email: 'jhonappleseed@gmail.com',
			country: 'en-US'
		});

		form.changes$.subscribe((changes) => {
			console.log('AppComponent.form.changes$', changes, form.valid);
			this.pushChanges();
		});

		this.form = form;
	}

	onValidate() {
		// console.log('AppComponent.onValidate', this.form.valid);
		return this.form.valid;
	}

	onSubmit() {
		if (this.form.valid) {
			console.log('AppComponent.onSubmit', this.form.value);
			this.form.submitted = true;
			// this.form.reset();
		}
	}

}

AppComponent.meta = {
	selector: '[app-component]',
};
