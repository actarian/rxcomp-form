import { Component, IFactoryMeta } from 'rxcomp';

export default class ErrorsComponent extends Component {

	static meta: IFactoryMeta = {
		selector: 'errors-component',
		inputs: ['control'],
		template: /* html */ `
		<div class="inner" [style]="{ display: control.invalid ? 'block' : 'none' }">
			<div class="error" *for="let [key, value] of control.errors">
				<span class="key" [innerHTML]="key"></span> <span class="value" [innerHTML]="value | json"></span>
			</div>
		</div>
		`
	};

}
