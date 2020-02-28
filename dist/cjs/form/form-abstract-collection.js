"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var form_abstract_1 = tslib_1.__importDefault(require("./form-abstract"));
var form_control_1 = tslib_1.__importDefault(require("./form-control"));
var form_status_1 = tslib_1.__importDefault(require("./models/form-status"));
/**
 * Abstract class representing a form collection.
 */
var FormAbstractCollection = /** @class */ (function (_super) {
    tslib_1.__extends(FormAbstractCollection, _super);
    /**
     * Create a FormAbstract.
     * @param controls an object containing controls.
     * @param validators a list of validators.
     */
    function FormAbstractCollection(controls, validators) {
        var _this = _super.call(this, validators) || this;
        _this.changesChildren = new rxjs_1.BehaviorSubject(undefined);
        _this.controls = controls;
        _this.initControls_();
        _this.initSubjects_();
        _this.initObservables_();
        return _this;
    }
    FormAbstractCollection.prototype.initControl_ = function (controlOrValue, key) {
        var control = controlOrValue instanceof form_abstract_1.default ? controlOrValue : new form_control_1.default(controlOrValue);
        control.addValidators.apply(control, this.validators);
        control.name = key;
        return control;
    };
    FormAbstractCollection.prototype.initControls_ = function () {
        var _this = this;
        this.forEach_(function (control, key) {
            _this.init(control, key);
        });
        return this.controls;
    };
    FormAbstractCollection.prototype.initSubjects_ = function () {
        this.changesChildren = this.changesChildren.pipe(operators_1.switchAll());
        this.switchSubjects_();
    };
    FormAbstractCollection.prototype.switchSubjects_ = function () {
        var changesChildren = this.reduce_(function (result, control) {
            result.push(control.changes$);
            return result;
        }, []);
        var changesChildren$ = changesChildren.length ? rxjs_1.combineLatest(changesChildren) : rxjs_1.of(changesChildren);
        this.changesChildren.next(changesChildren$);
    };
    FormAbstractCollection.prototype.initObservables_ = function () {
        var _this = this;
        this.changes$ = this.changesChildren.pipe(operators_1.map(function () { return _this.value; }), operators_1.shareReplay(1));
    };
    FormAbstractCollection.prototype.validate = function (value) {
        var errors;
        if (this.status === form_status_1.default.Disabled || this.status === form_status_1.default.Hidden) {
            // this.errors = {};
            errors = [];
        }
        else {
            // this.errors = Object.assign({}, ...this.validators.map(x => x(value)));
            // this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
            var errors_ = this.validators.map(function (x) { return x.validate(value); }).filter(function (x) { return x !== null; });
            errors = this.reduce_(function (result, control) {
                return result.concat(control.errors);
            }, errors_);
            this.status = errors.length === 0 ? form_status_1.default.Valid : form_status_1.default.Invalid;
        }
        return errors;
    };
    FormAbstractCollection.prototype.forEach_ = function (callback) {
        var _this = this;
        Object.keys(this.controls).forEach(function (key) { return callback(_this.controls[key], key); });
    };
    FormAbstractCollection.prototype.reduce_ = function (callback, result) {
        this.forEach_(function (control, key) {
            result = callback(result, control, key);
        });
        return result;
    };
    FormAbstractCollection.prototype.all_ = function (key, value) {
        return this.reduce_(function (result, control) {
            return result && control[key] === value;
        }, true);
    };
    FormAbstractCollection.prototype.any_ = function (key, value) {
        return this.reduce_(function (result, control) {
            return result || control[key] === value;
        }, false);
    };
    Object.defineProperty(FormAbstractCollection.prototype, "valid", {
        get: function () { return this.all_('valid', true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "invalid", {
        get: function () { return this.any_('invalid', true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "pending", {
        get: function () { return this.any_('pending', true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "disabled", {
        get: function () { return this.all_('disabled', true); },
        set: function (disabled) {
            this.forEach_(function (control) {
                control.disabled = disabled;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "enabled", {
        get: function () { return this.any_('enabled', true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "hidden", {
        get: function () { return this.all_('hidden', true); },
        set: function (hidden) {
            this.forEach_(function (control) {
                control.hidden = hidden;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "visible", {
        get: function () { return this.any_('visible', true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "submitted", {
        get: function () { return this.all_('submitted', true); },
        set: function (submitted) {
            this.forEach_(function (control) {
                control.submitted = submitted;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "dirty", {
        get: function () { return this.any_('dirty', true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "pristine", {
        get: function () { return this.all_('pristine', true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "touched", {
        get: function () { return this.all_('touched', true); },
        set: function (touched) {
            this.forEach_(function (control) {
                control.touched = touched;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "untouched", {
        get: function () { return this.any_('untouched', true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "value", {
        get: function () {
            return this.reduce_(function (result, control, key) {
                result[key] = control.value;
                return result;
            }, {});
        },
        set: function (value) {
            this.forEach_(function (control, key) {
                control.value = value[key];
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstractCollection.prototype, "errors", {
        get: function () {
            return this.reduce_(function (result, control) {
                return Object.assign(result, control.errors);
            }, {});
        },
        enumerable: true,
        configurable: true
    });
    FormAbstractCollection.prototype.reset = function () {
        this.forEach_(function (control) { return control.reset(); });
    };
    FormAbstractCollection.prototype.patch = function (value) {
        if (value) {
            this.forEach_(function (control, key) {
                if (value[key] != undefined) { // !!! keep != loose inequality
                    control.patch(value[key]);
                }
            });
        }
    };
    FormAbstractCollection.prototype.init = function (control, key) {
        this.controls[key] = this.initControl_(control, key);
    };
    FormAbstractCollection.prototype.get = function (key) {
        return this.controls[key];
    };
    FormAbstractCollection.prototype.set = function (control, key) {
        delete (this.controls[key]);
        this.controls[key] = this.initControl_(control, key);
        this.switchSubjects_();
    };
    // !!! needed?
    FormAbstractCollection.prototype.add = function (control, key) {
        this.controls[key] = this.initControl_(control, key);
        this.switchSubjects_();
    };
    FormAbstractCollection.prototype.remove = function (control) {
        var _this = this;
        var key = Object.keys(this.controls).find(function (key) { return _this.controls[key] === control ? key : null; });
        if (key) {
            this.removeKey(key);
        }
    };
    FormAbstractCollection.prototype.removeKey = function (key) {
        var exhist = this.controls[key] !== undefined;
        delete (this.controls[key]);
        if (exhist) {
            this.switchSubjects_();
        }
    };
    /**
     * adds one or more FormValidator.
     * @param validators a list of validators.
     */
    FormAbstractCollection.prototype.addValidators = function () {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        this.forEach_(function (control) { return control.addValidators.apply(control, validators); });
    };
    /**
     * replace one or more FormValidator.
     * @param validators a list of validators.
     */
    FormAbstractCollection.prototype.replaceValidators = function () {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        this.forEach_(function (control) { return control.replaceValidators.apply(control, validators); });
    };
    /**
     * remove all FormValidator.
     */
    FormAbstractCollection.prototype.clearValidators = function () {
        this.forEach_(function (control) { return control.clearValidators(); });
    };
    return FormAbstractCollection;
}(form_abstract_1.default));
exports.default = FormAbstractCollection;
