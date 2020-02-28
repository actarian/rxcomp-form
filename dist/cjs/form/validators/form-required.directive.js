"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_directive_1 = tslib_1.__importDefault(require("../directives/form-abstract.directive"));
var validators_1 = require("./validators");
/**
 * FormRequiredDirective attribute for injecting RequiredValidator.
 * @example
 * <input type="text" formControlName="firstName" required />
 */
var FormRequiredDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormRequiredDirective, _super);
    function FormRequiredDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormRequiredDirective.prototype.onInit = function () {
        // console.log('FormRequiredDirective', this.host.control);
        this.validator = validators_1.RequiredValidator();
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    };
    FormRequiredDirective.meta = {
        selector: '[required][formControl],[required][formControlName]',
        inputs: ['required'],
        hosts: { host: form_abstract_directive_1.default },
    };
    return FormRequiredDirective;
}(rxcomp_1.Directive));
exports.default = FormRequiredDirective;
