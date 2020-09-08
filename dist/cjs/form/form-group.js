"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formGroup = void 0;
var tslib_1 = require("tslib");
var form_abstract_collection_1 = tslib_1.__importDefault(require("./form-abstract-collection"));
/**
 * Class representing a FormGroup.
 */
var FormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(FormGroup, _super);
    /**
     * Create a FormControl.
     * @example
     * const form = new FormGroup({
     * 	firstName: null,
     *  lastName: null,
     * });
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param controls an object containing controls.
     * @param validators a list of validators.
     */
    function FormGroup(controls, validators) {
        if (controls === void 0) { controls = {}; }
        return _super.call(this, controls, validators) || this;
    }
    return FormGroup;
}(form_abstract_collection_1.default));
exports.default = FormGroup;
/**
 * Shortcut for new FormGroup
 */
function formGroup(controls, validators) {
    if (controls === void 0) { controls = {}; }
    return new FormGroup(controls, validators);
}
exports.formGroup = formGroup;
