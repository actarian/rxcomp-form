import { Module } from 'rxcomp';
import FormArrayDirective from './form/directives/form-array.directive';
import FormCheckboxDirective from './form/directives/form-checkbox.directive';
import FormFieldComponent from './form/directives/form-field.component';
import FormGroupDirective from './form/directives/form-group.directive';
import FormInputDirective from './form/directives/form-input.directive';
import FormMinLengthDirective from './form/directives/form-min-length.directive';
import FormPlaceholderDirective from './form/directives/form-placeholder.directive';
import FormRadioDirective from './form/directives/form-radio.directive';
import FormRequiredDirective from './form/directives/form-required.directive';
import FormSelectDirective from './form/directives/form-select.directive';
import FormSubmitDirective from './form/directives/form-submit.directive';

/**
 * FormModule Class.
 * @extends Module
 */
export default class FormModule extends Module {}
const factories = [
	FormArrayDirective,
	FormCheckboxDirective,
	FormFieldComponent,
	FormInputDirective,
	FormMinLengthDirective,
	FormRadioDirective,
	FormSelectDirective,
	FormGroupDirective,
	FormPlaceholderDirective,
	FormRequiredDirective,
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
