"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var form_abstract_1 = tslib_1.__importDefault(require("./form-abstract"));
var form_status_1 = tslib_1.__importDefault(require("./models/form-status"));
/**
 * Class representing a FormControl.
 */
var FormControl = /** @class */ (function (_super) {
    tslib_1.__extends(FormControl, _super);
    /**
     * Create a FormControl.
     * @example
     * const form = new FormControl(null);
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param value The value of the control.
     * @param validators a list of validators.
     */
    function FormControl(value, validators) {
        if (value === void 0) { value = null; }
        var _this = _super.call(this, validators) || this;
        _this.value_ = value;
        _this.status = form_status_1.default.Pending;
        _this.errors = {};
        _this.initSubjects_();
        _this.initObservables_();
        _this.statusSubject.next(null);
        return _this;
    }
    return FormControl;
}(form_abstract_1.default));
exports.default = FormControl;
/** Shortcut for new FormControl. */
function formControl(value, validators) {
    if (value === void 0) { value = null; }
    return new FormControl(value, validators);
}
exports.formControl = formControl;
