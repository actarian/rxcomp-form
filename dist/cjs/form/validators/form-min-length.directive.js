"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_directive_1 = tslib_1.__importDefault(require("../directives/form-abstract.directive"));
var validators_1 = require("./validators");
/**
 * FormMinLengthDirective attribute for injecting MinLengthValidator.
 * @example
 * <input type="text" formControlName="card" minlength="12" />
 */
var FormMinLengthDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormMinLengthDirective, _super);
    function FormMinLengthDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minlength = Number.NEGATIVE_INFINITY;
        return _this;
    }
    FormMinLengthDirective.prototype.onInit = function () {
        // console.log('FormMinLengthDirective.onInit', this.minlength);
        this.validator = validators_1.MinLengthValidator(this.minlength);
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    };
    FormMinLengthDirective.prototype.onChanges = function (changes) {
        // console.log('FormMinLengthDirective.onChanges', this.minlength);
        if (this.validator) {
            this.validator.params = { minlength: this.minlength };
        }
    };
    FormMinLengthDirective.meta = {
        selector: '[minlength][formControl],[minlength][formControlName]',
        inputs: ['minlength'],
        hosts: { host: form_abstract_directive_1.default },
    };
    return FormMinLengthDirective;
}(rxcomp_1.Directive));
exports.default = FormMinLengthDirective;
