import { Component } from 'rxcomp';
import FormGroup from './form/form-group';
import { RequiredValidator } from './form/form-validators';

export default class AppComponent extends Component {

	onInit() {

		const group = this.group = new FormGroup({
			firstName: 'Jhon',
			lastName: 'Appleseed',
		}, [RequiredValidator]);

		group.value$.subscribe(values => {
			console.log('AppComponent.group.value$', values);
		});

		group.status$.subscribe(() => {
			// console.log('AppComponent.group.status$');
			console.log('AppComponent.group.valid', group.valid);
		});
	}

}

AppComponent.meta = {
	selector: '[app-component]',
};
