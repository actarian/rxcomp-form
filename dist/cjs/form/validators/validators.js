"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = exports.PatternValidator = exports.MaxLengthValidator = exports.MinLengthValidator = exports.MaxValidator = exports.MinValidator = exports.RequiredTrueValidator = exports.RequiredValidator = exports.NullValidator = void 0;
var tslib_1 = require("tslib");
var form_validator_1 = tslib_1.__importDefault(require("./form-validator"));
/**
 * a null validator
 */
function NullValidator() {
    return new form_validator_1.default(function (value, params) {
        return null;
    });
}
exports.NullValidator = NullValidator;
/**
 * a required validator
 */
function RequiredValidator() {
    return new form_validator_1.default(function (value, params) {
        // console.log('RequiredValidator', value, (value == null || value.length === 0) ? { required: true } : null);
        return (value == null || value.length === 0) ? { required: true } : null;
    });
    // return (value == null || value.length === 0) ? 'required' : null;
}
exports.RequiredValidator = RequiredValidator;
/**
 * a required and true validator
 */
function RequiredTrueValidator() {
    return new form_validator_1.default(function (value, params) {
        // console.log('RequiredTrueValidator', value, value === true ? null : { required: true });
        return value === true ? null : { required: true };
    });
}
exports.RequiredTrueValidator = RequiredTrueValidator;
/**
 * a min number value validator
 */
function MinValidator(min) {
    return new form_validator_1.default(function (value, params) {
        var min = params.min;
        if (!value || !min) {
            return null;
        }
        value = parseFloat(value);
        return !isNaN(value) && value < min ? { min: { min: min, actual: value } } : null;
    }, { min: min });
}
exports.MinValidator = MinValidator;
/**
 * a max number value validator
 */
function MaxValidator(max) {
    return new form_validator_1.default(function (value, params) {
        var max = params.max;
        if (!value || !max) {
            return null;
        }
        value = parseFloat(value);
        return !isNaN(value) && value > max ? { max: { max: max, actual: value } } : null;
    }, { max: max });
}
exports.MaxValidator = MaxValidator;
/**
 * a min string length validator
 */
function MinLengthValidator(minlength) {
    return new form_validator_1.default(function (value, params) {
        var minlength = params.minlength;
        if (!value || !minlength) {
            return null;
        }
        var length = value ? value.length : 0;
        return length < minlength ? { minlength: { requiredLength: minlength, actualLength: length } } : null;
    }, { minlength: minlength });
}
exports.MinLengthValidator = MinLengthValidator;
/**
 * a max string length validator
 */
function MaxLengthValidator(maxlength) {
    return new form_validator_1.default(function (value, params) {
        var maxlength = params.maxlength;
        if (!value || !maxlength) {
            return null;
        }
        var length = value ? value.length : 0;
        return length > maxlength ? { minlength: { requiredLength: maxlength, actualLength: length } } : null;
    }, { maxlength: maxlength });
}
exports.MaxLengthValidator = MaxLengthValidator;
/**
 * a regex pattern validator
 */
function PatternValidator(pattern) {
    return new form_validator_1.default(function (value, params) {
        var pattern = params.pattern;
        if (!value || !pattern) {
            return null;
        }
        var regex = patternToRegEx(pattern);
        return regex.test(value) ? null : { pattern: { requiredPattern: regex.toString(), actualValue: value } };
    }, { pattern: pattern });
}
exports.PatternValidator = PatternValidator;
/**
 * an email pattern validator
 */
function EmailValidator() {
    var regex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return new form_validator_1.default(function (value, params) {
        if (!value) {
            return null;
        }
        return regex.test(value) ? null : { email: true };
    });
}
exports.EmailValidator = EmailValidator;
function patternToRegEx(pattern) {
    var regex;
    if (pattern instanceof RegExp) {
        regex = pattern;
    }
    else if (typeof pattern === 'string') {
        pattern = pattern.charAt(0) === '^' ? pattern : "^" + pattern;
        pattern = pattern.charAt(pattern.length - 1) === '$' ? pattern : pattern + "$";
        regex = new RegExp(pattern);
    }
    return regex || new RegExp('');
}
