import { Component } from 'rxcomp';
import { FormGroup, RequiredValidator } from '../../src/rxcomp-form';

export default class AppComponent extends Component {

	onInit() {
		const form = new FormGroup({
			firstName: null, // 'Jhon',
			lastName: null, // 'Appleseed',
			email: null, // 'jhonappleseed@gmail.com',
		}, [RequiredValidator]);

		form.value$.subscribe(values => {
			// console.log('AppComponent.form.value', values);
		});

		form.status$.subscribe(() => {
			// console.log('AppComponent.form.status$', form.valid);
			// console.log('AppComponent.form.valid', form.valid);
			this.pushChanges();
		});

		this.form = form;
	}

	onValidate() {
		// console.log('AppComponent.onValidate', this.form.valid);
		return this.form.valid;
	}

	onSubmit() {
		console.log('AppComponent.onSubmit', this.form.value);
	}

}

AppComponent.meta = {
	selector: '[app-component]',
};
