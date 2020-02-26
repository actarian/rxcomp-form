import { Component } from 'rxcomp';
import { FormArray, FormGroup, RequiredValidator } from '../../src/rxcomp-form';

export default class AppComponent extends Component {

	form: FormGroup;

	onInit() {
		const form = new FormGroup({
			hidden: 'hiddenValue',
			firstName: null,
			lastName: null,
			email: null,
			country: null,
			evaluate: null,
			newsletter: null,
			privacy: null,
			items: new FormArray([null, null, null], RequiredValidator()),
		});

		form.changes$.subscribe((changes) => {
			console.log('AppComponent.form.changes$', changes, form.valid, form);
			this.pushChanges();
		});

		this.form = form;
	}

	test(): void {
		this.form.patch({
			firstName: 'Jhon',
			lastName: 'Appleseed',
			email: 'jhonappleseed@gmail.com',
			country: 'en-US',
			evaluate: 'free',
			privacy: true,
			items: ['rxcomp', 'rxjs', 'forms']
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			console.log('AppComponent.onSubmit', this.form.value);
			this.form.submitted = true;
			// this.form.reset();
		}
	}

	static meta = {
		selector: '[app-component]',
	};

}
