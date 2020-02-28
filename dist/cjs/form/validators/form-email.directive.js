"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_directive_1 = tslib_1.__importDefault(require("../directives/form-abstract.directive"));
var validators_1 = require("./validators");
/**
 * FormEmailDirective attribute for injecting EmailValidator.
 * @example
 * <input type="text" formControlName="email" email />
 */
var FormEmailDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormEmailDirective, _super);
    function FormEmailDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormEmailDirective.prototype.onInit = function () {
        // console.log('FormEmailDirective', this.host.control);
        var validator = this.validator = validators_1.EmailValidator();
        if (this.host) {
            this.host.control.addValidators(validator);
        }
    };
    FormEmailDirective.meta = {
        selector: '[email][formControl],[email][formControlName]',
        inputs: ['email'],
        hosts: { host: form_abstract_directive_1.default },
    };
    return FormEmailDirective;
}(rxcomp_1.Directive));
exports.default = FormEmailDirective;
