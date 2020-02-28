"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_directive_1 = tslib_1.__importDefault(require("../directives/form-abstract.directive"));
var validators_1 = require("./validators");
/**
 * FormPatternDirective attribute for injecting PatternValidator.
 * @example
 * <input type="text" formControlName="visa" pattern="^4[0-9]{12}(?:[0-9]{3})?$" />
 */
var FormPatternDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormPatternDirective, _super);
    function FormPatternDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormPatternDirective.prototype.onInit = function () {
        // console.log('FormPatternDirective.onInit', this.pattern);
        if (this.pattern) {
            this.validator = validators_1.PatternValidator(this.pattern);
            if (this.host) {
                this.host.control.addValidators(this.validator);
            }
        }
    };
    FormPatternDirective.prototype.onChanges = function (changes) {
        // console.log('FormPatternDirective.onChanges', this.pattern);
        if (this.validator) {
            this.validator.params = { pattern: this.pattern };
        }
    };
    FormPatternDirective.meta = {
        selector: '[pattern][formControl],[pattern][formControlName]',
        inputs: ['pattern'],
        hosts: { host: form_abstract_directive_1.default },
    };
    return FormPatternDirective;
}(rxcomp_1.Directive));
exports.default = FormPatternDirective;
