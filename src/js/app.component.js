import { Component } from 'rxcomp';
import FormGroup from './form/form-group';
import { RequiredValidator } from './form/form-validators';

export default class AppComponent extends Component {

	onInit() {
		const group = this.group = new FormGroup({
			firstName: 'Jhon',
			lastName: 'Appleseed',
		}, [RequiredValidator]);
		group.valueChanges$.subscribe(values => {
			console.log('AppComponent.group.valueChanges$', values);
		});
		group.statusChanges$.subscribe(() => {
			// console.log('AppComponent.group.statusChanges$');
			console.log('AppComponent.group.valid', group.valid);
		});
	}

}

AppComponent.meta = {
	selector: '[app-component]',
};
