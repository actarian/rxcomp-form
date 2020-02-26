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
import FormEmailDirective from './form/validators/form-email.directive';
import FormMaxLengthDirective from './form/validators/form-max-length.directive';
import FormMaxDirective from './form/validators/form-max.directive';
import FormMinLengthDirective from './form/validators/form-min-length.directive';
import FormMinDirective from './form/validators/form-min.directive';
import FormPatternDirective from './form/validators/form-pattern.directive';
import FormRequiredTrueDirective from './form/validators/form-required-true.directive';
import FormRequiredDirective from './form/validators/form-required.directive';

const factories = [
	FormArrayDirective,
	FormCheckboxDirective,
	FormFieldComponent,
	FormGroupDirective,
	FormInputDirective,
	FormPlaceholderDirective,
	FormRadioDirective,
	FormSelectDirective,
	FormSubmitDirective,
	FormEmailDirective,
	FormMaxDirective,
	FormMaxLengthDirective,
	FormMinDirective,
	FormMinLengthDirective,
	FormPatternDirective,
	FormRequiredDirective,
	FormRequiredTrueDirective,
];

const pipes = [];

/**
 * @desc FormModule Class.
 * @example
 * export default class AppModule extends Module {}
 *
 * AppModule.meta = {
 *  imports: [
 *   CoreModule,
 *   FormModule
 *  ],
 *  declarations: [
 *   ErrorsComponent
 *  ],
 *  bootstrap: AppComponent,
 * };
 * @extends Module
 */
export default class FormModule extends Module {

	static meta = {
		declarations: [
			...factories,
			...pipes,
		],
		exports: [
			...factories,
			...pipes,
		]
	};

}
