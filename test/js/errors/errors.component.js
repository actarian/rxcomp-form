import { Component } from 'rxcomp';

export default class ErrorsComponent extends Component {

	onChanges(changes) {
		console.log(this.control.validators);
	}

}

ErrorsComponent.meta = {
	selector: 'errors-component',
	inputs: ['control'],
	template: /* html */ `
	<div class="inner" *if="control.invalid">
		<div class="error" *for="let [key, value] of control.errors">
			<span class="key" [innerHTML]="key"></span> <span class="value" [innerHTML]="value | json"></span>
		</div>
	</div>
	`
};
