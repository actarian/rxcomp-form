import { Module } from 'rxcomp';
import ControlGroupDirective from './form/control-group.directive';
import FormAccessor from './form/form-accessor';
import FormGroupAccessor from './form/form-group-accessor';
import SubmitDirective from './form/submit.directive';

export default class FormModule extends Module {}
const factories = [
	FormAccessor,
	FormGroupAccessor,
	ControlGroupDirective,
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
