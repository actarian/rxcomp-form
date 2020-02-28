"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var form_abstract_collection_directive_1 = tslib_1.__importDefault(require("./form-abstract-collection.directive"));
/**
 * FormGroupDirective.
 * @example
 * <form [formGroup]="form" (submit)="onSubmit()" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
var FormGroupDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormGroupDirective, _super);
    function FormGroupDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormGroupDirective.prototype, "control", {
        get: function () {
            // console.log('FormGroupDirective', (this.formGroupName ? `formGroupName ${this.formGroupName}` : `formGroup ${this.formGroup}`));
            if (this.formGroup) {
                return this.formGroup;
            }
            else {
                if (!this.host) {
                    throw ('missing form collection');
                }
                // !!! check instanceof ?
                return this.host.control.get(this.formGroupName);
            }
        },
        enumerable: true,
        configurable: true
    });
    FormGroupDirective.meta = {
        selector: '[formGroup],[formGroupName]',
        inputs: ['formGroup', 'formGroupName'],
        hosts: { host: form_abstract_collection_directive_1.default },
    };
    return FormGroupDirective;
}(form_abstract_collection_directive_1.default));
exports.default = FormGroupDirective;
