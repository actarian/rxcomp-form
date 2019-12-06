import { Module } from 'rxcomp';
import FormPlaceholderDirective from './form/directives/form-placeholder.directive';
import FormSubmitDirective from './form/directives/form-submit.directive';
import FormValueDirective from './form/directives/form-value.directive';
import FormArrayComponent from './form/form-array.component';
import FormControlGroupComponent from './form/form-control-group.component';
import FormControlDirective from './form/form-control.directive';
import FormGroupComponent from './form/form-group.component';

export default class FormModule extends Module {}
const factories = [
	FormArrayComponent,
	FormControlDirective,
	FormControlGroupComponent,
	FormGroupComponent,
	FormPlaceholderDirective,
	FormValueDirective,
	FormSubmitDirective,
];
const pipes = [
];
FormModule.meta = {
	declarations: [
		...factories,
		...pipes,
	],
	exports: [
		...factories,
		...pipes,
	]
};
