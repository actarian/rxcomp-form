"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var form_abstract_collection_directive_1 = tslib_1.__importDefault(require("./form-abstract-collection.directive"));
/**
 * FormFieldComponent.
 * @example
 * <div formFieldName="firstName">
 *	<input type="text" [formControl]="control" />
 * </div>
 */
var FormFieldComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FormFieldComponent, _super);
    function FormFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormFieldComponent.prototype, "control", {
        get: function () {
            // console.log('FormFieldComponent', (this.formFieldName ? `formFieldName ${this.formFieldName}` : `formField ${this.formField}`));
            if (this.formField) {
                return this.formField;
            }
            else {
                if (!this.host) {
                    throw ('missing form collection');
                }
                return this.host.control.get(this.formFieldName);
            }
        },
        enumerable: false,
        configurable: true
    });
    FormFieldComponent.prototype.onChanges = function (changes) {
        var node = rxcomp_1.getContext(this).node;
        var flags = this.control.flags;
        Object.keys(flags).forEach(function (key) {
            flags[key] ? node.classList.add(key) : node.classList.remove(key);
        });
    };
    FormFieldComponent.meta = {
        selector: '[formField],[formFieldName]',
        inputs: ['formField', 'formFieldName'],
        hosts: { host: form_abstract_collection_directive_1.default },
    };
    return FormFieldComponent;
}(rxcomp_1.Component));
exports.default = FormFieldComponent;
