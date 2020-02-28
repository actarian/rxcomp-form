"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var form_abstract_collection_directive_1 = tslib_1.__importDefault(require("./form-abstract-collection.directive"));
/**
 * FormArrayDirective.
 * @example
 * <form [formArray]="form" (submit)="onSubmit()" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
var FormArrayDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormArrayDirective, _super);
    function FormArrayDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormArrayDirective.prototype, "control", {
        get: function () {
            // console.log('FormArrayDirective', (this.formArrayName ? `formArrayName ${this.formArrayName}` : `formArray ${this.formArray}`));
            if (this.formArray) {
                return this.formArray;
            }
            else {
                if (!this.host) {
                    throw ('missing form collection');
                }
                // !!! check instanceof ?
                return this.host.control.get(this.formArrayName);
            }
        },
        enumerable: true,
        configurable: true
    });
    FormArrayDirective.meta = {
        selector: '[formArray],[formArrayName]',
        inputs: ['formArray', 'formArrayName'],
        hosts: { host: form_abstract_collection_directive_1.default },
    };
    return FormArrayDirective;
}(form_abstract_collection_directive_1.default));
exports.default = FormArrayDirective;
