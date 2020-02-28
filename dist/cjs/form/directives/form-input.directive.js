"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_collection_directive_1 = tslib_1.__importDefault(require("./form-abstract-collection.directive"));
var form_abstract_directive_1 = tslib_1.__importDefault(require("./form-abstract.directive"));
/**
 * FormInputDirective to handle input text FormControl value.
 * @example
 * <input type="text" formControlName="firstName" />
 * @example
 * <input type="text" [formControl]="form.get('firstName')" />
 */
var FormInputDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormInputDirective, _super);
    function FormInputDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormInputDirective.prototype.writeValue = function (value) {
        var node = rxcomp_1.getContext(this).node;
        node.value = value == null ? '' : value;
    };
    FormInputDirective.prototype.onChange = function (event) {
        var node = rxcomp_1.getContext(this).node;
        this.control.value = node.value === '' ? null : node.value;
    };
    FormInputDirective.prototype.onBlur = function (event) {
        this.control.touched = true;
    };
    FormInputDirective.meta = {
        selector: 'input[type=text][formControl],input[type=text][formControlName],input[type=email][formControl],input[type=email][formControlName],input[type=password][formControl],input[type=password][formControlName],textarea[formControl],textarea[formControlName]',
        inputs: ['formControl', 'formControlName'],
        hosts: { host: form_abstract_collection_directive_1.default },
    };
    return FormInputDirective;
}(form_abstract_directive_1.default));
exports.default = FormInputDirective;
