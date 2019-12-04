import { Module } from 'rxcomp';
import FormControlGroupComponent from './form/form-control-group.component';
import FormControlDirective from './form/form-control.directive';
import FormGroupComponent from './form/form-group.component';
import SubmitDirective from './form/submit.directive';

export default class FormModule extends Module {}
const factories = [
	FormControlDirective,
	FormGroupComponent,
	FormControlGroupComponent,
	SubmitDirective,
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
