"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_directive_1 = tslib_1.__importDefault(require("../directives/form-abstract.directive"));
var validators_1 = require("./validators");
/**
 * FormMinDirective attribute for injecting MinValidator.
 * @example
 * <input type="number" formControlName="qty" min="1" />
 */
var FormMinDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormMinDirective, _super);
    function FormMinDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = Number.NEGATIVE_INFINITY;
        return _this;
    }
    FormMinDirective.prototype.onInit = function () {
        // console.log('FormMinDirective.onInit', this.min);
        this.validator = validators_1.MinValidator(this.min);
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    };
    FormMinDirective.prototype.onChanges = function (changes) {
        // console.log('FormMinDirective.onChanges', this.min);
        if (this.validator) {
            this.validator.params = { min: this.min };
        }
    };
    FormMinDirective.meta = {
        selector: '[min][formControl],[min][formControlName]',
        inputs: ['min'],
        hosts: { host: form_abstract_directive_1.default },
    };
    return FormMinDirective;
}(rxcomp_1.Directive));
exports.default = FormMinDirective;
