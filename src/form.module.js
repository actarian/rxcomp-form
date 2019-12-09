/**
 * FormModule module.
 * @module my/pants
 * @see module:my/shirt
 */

import { Module } from 'rxcomp';
import FormArrayDirective from './form/directives/form-array.directive';
import FormCheckboxDirective from './form/directives/form-checkbox.directive';
import FormFieldComponent from './form/directives/form-field.component';
import FormGroupDirective from './form/directives/form-group.directive';
import FormInputDirective from './form/directives/form-input.directive';
import FormPlaceholderDirective from './form/directives/form-placeholder.directive';
import FormRadioDirective from './form/directives/form-radio.directive';
import FormSelectDirective from './form/directives/form-select.directive';
import FormSubmitDirective from './form/directives/form-submit.directive';

export default class FormModule extends Module {}
const factories = [
	FormArrayDirective,
	FormCheckboxDirective,
	FormFieldComponent,
	FormInputDirective,
	FormRadioDirective,
	FormSelectDirective,
	FormGroupDirective,
	FormPlaceholderDirective,
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
