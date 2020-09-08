"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * FormValidator class representing a form validator.
 * @example
 * export function EqualValidator(equal) {
 * 	return new FormValidator(function(value) {
 * 		const equal = this.params.equal;
 * 		if (!value || !equal) {
 * 			return null;
 * 		}
 * 		return value !== equal ? { equal: { equal: equal, actual: value } } : null;
 * 	}, { equal });
 * }
 */
var FormValidator = /** @class */ (function () {
    /**
     * Create a FormValidator.
     */
    function FormValidator(validator, params) {
        this.validator = validator;
        this.params$ = new rxjs_1.BehaviorSubject(params);
    }
    Object.defineProperty(FormValidator.prototype, "params", {
        get: function () {
            return this.params$.getValue();
        },
        set: function (params) {
            if (params) {
                var current_1 = this.params;
                var differs = Object.keys(params).reduce(function (flag, key) {
                    return flag || !current_1 || current_1[key] !== params[key];
                }, false);
                if (differs) {
                    // if (JSON.stringify(params) !== JSON.stringify(this.params)) {
                    this.params$.next(params);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * validate a value
     * @param value the value to validate
     */
    FormValidator.prototype.validate = function (value) {
        return this.validator(value, this.params);
    };
    return FormValidator;
}());
exports.default = FormValidator;
