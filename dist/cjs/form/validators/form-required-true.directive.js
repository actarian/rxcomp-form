"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_directive_1 = tslib_1.__importDefault(require("../directives/form-abstract.directive"));
var validators_1 = require("./validators");
/**
 * FormRequiredTrueDirective attribute for injecting RequiredTrueValidator.
 * @example
 * <input type="checkbox" formControlName="privacy" requiredTrue />
 */
var FormRequiredTrueDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormRequiredTrueDirective, _super);
    function FormRequiredTrueDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormRequiredTrueDirective.prototype.onInit = function () {
        // console.log('FormRequiredTrueDirective', this.host.control);
        this.validator = validators_1.RequiredTrueValidator();
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    };
    FormRequiredTrueDirective.meta = {
        selector: '[requiredTrue][formControl],[requiredTrue][formControlName]',
        inputs: ['requiredTrue'],
        hosts: { host: form_abstract_directive_1.default },
    };
    return FormRequiredTrueDirective;
}(rxcomp_1.Directive));
exports.default = FormRequiredTrueDirective;
