"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_collection_directive_1 = tslib_1.__importDefault(require("./form-abstract-collection.directive"));
var form_abstract_directive_1 = tslib_1.__importDefault(require("./form-abstract.directive"));
/**
 * FormSelectDirective.
 * @example
 * <select formControlName="country">
 * 	<option value="">select</option>
 * 	<option value="en-US">English</option>
 * 	<option value="it-IT">Italiano</option>
 * </select>
 * @example
 * <select [formControl]="control">
 * 	<option value="">select</option>
 * 	<option value="en-US">English</option>
 * 	<option value="it-IT">Italiano</option>
 * </select>
 */
var FormSelectDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormSelectDirective, _super);
    function FormSelectDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormSelectDirective.prototype.writeValue = function (value) {
        var node = rxcomp_1.getContext(this).node;
        node.value = value == null ? '' : value;
    };
    FormSelectDirective.prototype.setDisabledState = function (disabled) {
        var node = rxcomp_1.getContext(this).node;
        node.disabled = disabled;
    };
    FormSelectDirective.prototype.onChange = function (event) {
        var node = rxcomp_1.getContext(this).node;
        this.control.value = node.value === '' ? null : node.value;
    };
    FormSelectDirective.prototype.onBlur = function (event) {
        this.control.touched = true;
    };
    FormSelectDirective.meta = {
        selector: 'select[formControl],select[formControlName]',
        inputs: ['formControl', 'formControlName'],
        hosts: { host: form_abstract_collection_directive_1.default },
    };
    return FormSelectDirective;
}(form_abstract_directive_1.default));
exports.default = FormSelectDirective;
