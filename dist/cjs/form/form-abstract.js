"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var form_status_1 = tslib_1.__importDefault(require("./models/form-status"));
/**
 * Abstract class representing a form control.
 */
var FormAbstract = /** @class */ (function () {
    /**
     * Create a FormAbstract.
     * @param validators a list of validators.
     */
    function FormAbstract(validators) {
        var _this = this;
        this.value_ = undefined;
        this.submitted_ = false;
        this.touched_ = false;
        this.dirty_ = false;
        this.valueSubject = new rxjs_1.BehaviorSubject(null);
        this.statusSubject = new rxjs_1.BehaviorSubject(null);
        this.validatorsSubject = new rxjs_1.ReplaySubject().pipe(operators_1.switchAll());
        this.value$ = this.valueSubject.pipe(operators_1.distinctUntilChanged(), operators_1.skip(1), operators_1.tap(function () {
            _this.submitted_ = false;
            _this.dirty_ = true;
            _this.statusSubject.next(null);
        }), operators_1.shareReplay(1));
        this.status$ = rxjs_1.merge(this.statusSubject, this.validatorsSubject).pipe(
        // auditTime(1),
        operators_1.switchMap(function () { return _this.validate$(_this.value); }), operators_1.shareReplay(1));
        this.changes$ = rxjs_1.merge(this.value$, this.status$).pipe(operators_1.map(function () { return _this.value; }), operators_1.auditTime(1), operators_1.shareReplay(1));
        this.validators = validators ? (Array.isArray(validators) ? validators : [validators]) : [];
    }
    /**
     * initialize subjects
     */
    FormAbstract.prototype.initSubjects_ = function () {
        this.switchValidators_();
    };
    FormAbstract.prototype.switchValidators_ = function () {
        var validatorParams = this.validators.map(function (x) { return x.params$; });
        var validatorParams$ = validatorParams.length ? rxjs_1.combineLatest(validatorParams) : rxjs_1.of(validatorParams);
        this.validatorsSubject.next(validatorParams$);
    };
    /**
     * initialize observables
     */
    FormAbstract.prototype.initObservables_ = function () { };
    /**
     * @param value the inner control value
     * @return an object with key, value errors
     */
    FormAbstract.prototype.validate$ = function (value) {
        var _this = this;
        if (this.status === form_status_1.default.Disabled || this.status === form_status_1.default.Hidden || this.submitted_ || !this.validators.length) {
            this.errors = {};
            if (this.status === form_status_1.default.Invalid) {
                this.status = form_status_1.default.Valid;
            }
            return rxjs_1.of(this.errors);
        }
        else {
            return rxjs_1.combineLatest(this.validators.map(function (x) {
                var result$ = x.validate(value);
                return rxjs_1.isObservable(result$) ? result$ : rxjs_1.of(result$);
            })).pipe(operators_1.map(function (results) {
                _this.errors = Object.assign.apply(Object, tslib_1.__spreadArrays([{}], results));
                _this.status = Object.keys(_this.errors).length === 0 ? form_status_1.default.Valid : form_status_1.default.Invalid;
                return _this.errors;
            }));
        }
    };
    Object.defineProperty(FormAbstract.prototype, "pending", {
        /**
         * @return the pending status
         */
        get: function () { return this.status === form_status_1.default.Pending; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "valid", {
        /**
         * @return the valid status
         */
        get: function () { return this.status !== form_status_1.default.Invalid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "invalid", {
        /**
         * @return the invalid status
         */
        get: function () { return this.status === form_status_1.default.Invalid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "disabled", {
        /**
         * @return the disabled status
         */
        get: function () { return this.status === form_status_1.default.Disabled; },
        /**
         * @param disabled the disabled state
         */
        set: function (disabled) {
            if (disabled) {
                if (this.status !== form_status_1.default.Disabled) {
                    this.status = form_status_1.default.Disabled;
                    // this.value_ = null;
                    this.dirty_ = false;
                    this.touched_ = false;
                    this.submitted_ = false;
                    this.statusSubject.next(null);
                }
            }
            else {
                if (this.status === form_status_1.default.Disabled) {
                    this.status = form_status_1.default.Pending;
                    // this.value_ = null;
                    this.dirty_ = false;
                    this.touched_ = false;
                    this.submitted_ = false;
                    this.statusSubject.next(null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "enabled", {
        /**
         * @return the enabled status
         */
        get: function () { return this.status !== form_status_1.default.Disabled; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "hidden", {
        /**
         * @return the hidden status
         */
        get: function () { return this.status === form_status_1.default.Hidden; },
        /**
         * @param hidden the hidden state
         */
        set: function (hidden) {
            if (hidden) {
                if (this.status !== form_status_1.default.Hidden) {
                    this.status = form_status_1.default.Hidden;
                    // this.value_ = null;
                    this.dirty_ = false;
                    this.touched_ = false;
                    this.submitted_ = false;
                    this.statusSubject.next(null);
                }
            }
            else {
                if (this.status === form_status_1.default.Hidden) {
                    this.status = form_status_1.default.Pending;
                    // this.value_ = null;
                    this.dirty_ = false;
                    this.touched_ = false;
                    this.submitted_ = false;
                    this.statusSubject.next(null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "visible", {
        /**
         * @return the visible status
         */
        get: function () { return this.status !== form_status_1.default.Hidden; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "submitted", {
        /**
         * @return the submitted status
         */
        get: function () { return this.submitted_; },
        /**
         * @param submitted the submitted state
         */
        set: function (submitted) {
            this.submitted_ = submitted;
            this.statusSubject.next(null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "dirty", {
        /**
         * @return the dirty status
         */
        get: function () { return this.dirty_; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "pristine", {
        /**
         * @return the pristine status
         */
        get: function () { return !this.dirty_; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "touched", {
        /**
         * @return the touched status
         */
        get: function () { return this.touched_; },
        /**
         * @param touched the touched state
         */
        set: function (touched) {
            this.touched_ = touched;
            this.statusSubject.next(null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "untouched", {
        /**
         * @return the untouched status
         */
        get: function () { return !this.touched_; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "flags", {
        get: function () {
            return {
                untouched: this.untouched,
                touched: this.touched,
                pristine: this.pristine,
                dirty: this.dirty,
                pending: this.pending,
                enabled: this.enabled,
                disabled: this.disabled,
                hidden: this.hidden,
                visible: this.visible,
                valid: this.valid,
                invalid: this.invalid,
                submitted: this.submitted
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormAbstract.prototype, "value", {
        /**
         * @return inner value of the control
         */
        get: function () { return this.value_; },
        /**
         * @param value a value
         */
        set: function (value) {
            this.value_ = value;
            this.valueSubject.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param status optional FormStatus
     */
    FormAbstract.prototype.reset = function (status) {
        this.status = status || form_status_1.default.Pending;
        this.value_ = null;
        this.dirty_ = false;
        this.touched_ = false;
        this.submitted_ = false;
        this.statusSubject.next(null);
    };
    /**
     * @param value a value
     */
    FormAbstract.prototype.patch = function (value) {
        this.value_ = value;
        this.dirty_ = true;
        this.submitted_ = false;
        this.statusSubject.next(null);
    };
    /**
     * adds one or more FormValidator.
     * @param validators a list of validators.
     */
    FormAbstract.prototype.addValidators = function () {
        var _a;
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        (_a = this.validators).push.apply(_a, validators);
        this.switchValidators_();
    };
    /**
     * replace one or more FormValidator.
     * @param validators a list of validators.
     */
    FormAbstract.prototype.replaceValidators = function () {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        this.validators = validators;
        this.switchValidators_();
    };
    /**
     * remove all FormValidator.
     */
    FormAbstract.prototype.clearValidators = function () {
        this.validators = [];
        this.switchValidators_();
    };
    return FormAbstract;
}());
exports.default = FormAbstract;
