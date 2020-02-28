"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var form_abstract_collection_1 = tslib_1.__importDefault(require("./form-abstract-collection"));
/**
 * Class representing a FormArray.
 */
var FormArray = /** @class */ (function (_super) {
    tslib_1.__extends(FormArray, _super);
    /**
     * Create a FormArray.
     * @example
     * const form = new FormArray([null, null, null]);
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param controls an array containing controls.
     * @param validators a list of validators.
     */
    function FormArray(controls, validators) {
        if (controls === void 0) { controls = []; }
        return _super.call(this, controls, validators) || this;
    }
    FormArray.prototype.forEach_ = function (callback) {
        this.controls.forEach(function (control, key) { return callback(control, key); });
    };
    Object.defineProperty(FormArray.prototype, "value", {
        get: function () {
            return this.reduce_(function (result, control, key) {
                result[key] = control.value;
                return result;
            }, []); // init as array
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArray.prototype, "length", {
        get: function () {
            return this.controls.length;
        },
        enumerable: true,
        configurable: true
    });
    FormArray.prototype.init = function (control, key) {
        this.controls.length = Math.max(this.controls.length, key);
        this.controls[key] = this.initControl_(control, key);
    };
    FormArray.prototype.set = function (control, key) {
        // this.controls.length = Math.max(this.controls.length, key);
        // this.controls[key] = this.initControl_(control);
        this.controls.splice(key, 1, this.initControl_(control, key));
        this.switchSubjects_();
    };
    FormArray.prototype.add = function (control, key) {
        this.controls.length = Math.max(this.controls.length, key);
        this.controls[key] = this.initControl_(control, key);
        this.switchSubjects_();
    };
    FormArray.prototype.push = function (control) {
        // this.controls.length = Math.max(this.controls.length, key);
        // this.controls[key] = this.initControl_(control);
        this.controls.push(this.initControl_(control, this.controls.length));
        this.switchSubjects_();
    };
    FormArray.prototype.insert = function (control, key) {
        this.controls.splice(key, 0, this.initControl_(control, key));
        this.switchSubjects_();
    };
    FormArray.prototype.remove = function (control) {
        var key = this.controls.indexOf(control);
        if (key !== -1) {
            this.removeKey(key);
        }
    };
    FormArray.prototype.removeKey = function (key) {
        if (this.controls.length > key) {
            this.controls.splice(key, 1);
            this.switchSubjects_();
        }
    };
    FormArray.prototype.at = function (key) {
        return this.controls[key];
    };
    return FormArray;
}(form_abstract_collection_1.default));
exports.default = FormArray;
/**
 * Shortcut for new FormArray
 */
function formArray(controls, validators) {
    if (controls === void 0) { controls = []; }
    return new FormArray(controls, validators);
}
exports.formArray = formArray;
