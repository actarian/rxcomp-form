"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_directive_1 = tslib_1.__importDefault(require("../directives/form-abstract.directive"));
var validators_1 = require("./validators");
/**
 * FormMaxDirective attribute for injecting MaxValidator.
 * @example
 * <input type="number" formControlName="qty" max="12" />
 */
var FormMaxDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormMaxDirective, _super);
    function FormMaxDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.max = Number.POSITIVE_INFINITY;
        return _this;
    }
    FormMaxDirective.prototype.onInit = function () {
        // console.log('FormMaxDirective.onInit', this.max);
        this.validator = validators_1.MaxValidator(this.max);
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    };
    FormMaxDirective.prototype.onChanges = function (changes) {
        // console.log('FormMaxDirective.onChanges', this.max);
        if (this.validator) {
            this.validator.params = { max: this.max };
        }
    };
    FormMaxDirective.meta = {
        selector: '[max][formControl],[max][formControlName]',
        inputs: ['max'],
        hosts: { host: form_abstract_directive_1.default },
    };
    return FormMaxDirective;
}(rxcomp_1.Directive));
exports.default = FormMaxDirective;
