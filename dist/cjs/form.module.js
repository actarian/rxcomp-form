"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_array_directive_1 = tslib_1.__importDefault(require("./form/directives/form-array.directive"));
var form_checkbox_directive_1 = tslib_1.__importDefault(require("./form/directives/form-checkbox.directive"));
var form_field_component_1 = tslib_1.__importDefault(require("./form/directives/form-field.component"));
var form_group_directive_1 = tslib_1.__importDefault(require("./form/directives/form-group.directive"));
var form_input_directive_1 = tslib_1.__importDefault(require("./form/directives/form-input.directive"));
var form_placeholder_directive_1 = tslib_1.__importDefault(require("./form/directives/form-placeholder.directive"));
var form_radio_directive_1 = tslib_1.__importDefault(require("./form/directives/form-radio.directive"));
var form_select_directive_1 = tslib_1.__importDefault(require("./form/directives/form-select.directive"));
var form_submit_directive_1 = tslib_1.__importDefault(require("./form/directives/form-submit.directive"));
var form_email_directive_1 = tslib_1.__importDefault(require("./form/validators/form-email.directive"));
var form_max_length_directive_1 = tslib_1.__importDefault(require("./form/validators/form-max-length.directive"));
var form_max_directive_1 = tslib_1.__importDefault(require("./form/validators/form-max.directive"));
var form_min_length_directive_1 = tslib_1.__importDefault(require("./form/validators/form-min-length.directive"));
var form_min_directive_1 = tslib_1.__importDefault(require("./form/validators/form-min.directive"));
var form_pattern_directive_1 = tslib_1.__importDefault(require("./form/validators/form-pattern.directive"));
var form_required_true_directive_1 = tslib_1.__importDefault(require("./form/validators/form-required-true.directive"));
var form_required_directive_1 = tslib_1.__importDefault(require("./form/validators/form-required.directive"));
var factories = [
    form_array_directive_1.default,
    form_checkbox_directive_1.default,
    form_field_component_1.default,
    form_group_directive_1.default,
    form_input_directive_1.default,
    form_placeholder_directive_1.default,
    form_radio_directive_1.default,
    form_select_directive_1.default,
    form_submit_directive_1.default,
    form_email_directive_1.default,
    form_max_directive_1.default,
    form_max_length_directive_1.default,
    form_min_directive_1.default,
    form_min_length_directive_1.default,
    form_pattern_directive_1.default,
    form_required_directive_1.default,
    form_required_true_directive_1.default,
];
var pipes = [];
/**
 * FormModule Class.
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
var FormModule = /** @class */ (function (_super) {
    tslib_1.__extends(FormModule, _super);
    function FormModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormModule.meta = {
        declarations: tslib_1.__spreadArrays(factories, pipes),
        exports: tslib_1.__spreadArrays(factories, pipes)
    };
    return FormModule;
}(rxcomp_1.Module));
exports.default = FormModule;
