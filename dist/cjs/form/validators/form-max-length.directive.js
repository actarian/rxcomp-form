"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_directive_1 = tslib_1.__importDefault(require("../directives/form-abstract.directive"));
var validators_1 = require("./validators");
// import { EmailValidator, MaxLengthValidator, MaxValidator, MaxLengthValidator, MaxValidator, NullValidator, PatternValidator, RequiredTrueValidator, RequiredValidator } from './form/validators/validators';
/**
 * FormMaxLengthDirective attribute for injecting MaxLengthValidator.
 * @example
 * <input type="text" formControlName="card" maxlength="12" />
 */
var FormMaxLengthDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormMaxLengthDirective, _super);
    function FormMaxLengthDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxlength = Number.POSITIVE_INFINITY;
        return _this;
    }
    FormMaxLengthDirective.prototype.onInit = function () {
        // console.log('FormMaxLengthDirective.onInit', this.maxlength);
        this.validator = validators_1.MaxLengthValidator(this.maxlength);
        if (this.host) {
            this.host.control.addValidators(this.validator);
        }
    };
    FormMaxLengthDirective.prototype.onChanges = function (changes) {
        // console.log('FormMaxLengthDirective.onChanges', this.maxlength);
        if (this.validator) {
            this.validator.params = { maxlength: this.maxlength };
        }
    };
    FormMaxLengthDirective.meta = {
        selector: '[maxlength][formControl],[maxlength][formControlName]',
        inputs: ['maxlength'],
        hosts: { host: form_abstract_directive_1.default },
    };
    return FormMaxLengthDirective;
}(rxcomp_1.Directive));
exports.default = FormMaxLengthDirective;
