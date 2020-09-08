"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
/**
 * Abstract class representing a FormAbstractCollectionDirective.
 */
var FormAbstractCollectionDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormAbstractCollectionDirective, _super);
    function FormAbstractCollectionDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormAbstractCollectionDirective.prototype, "control", {
        get: function () {
            // !!! return null?
            return {};
        },
        enumerable: false,
        configurable: true
    });
    FormAbstractCollectionDirective.prototype.onChanges = function (changes) {
        var node = rxcomp_1.getContext(this).node;
        var flags = this.control.flags;
        Object.keys(flags).forEach(function (key) {
            flags[key] ? node.classList.add(key) : node.classList.remove(key);
        });
    };
    FormAbstractCollectionDirective.meta = {
        selector: '',
        hosts: { host: FormAbstractCollectionDirective },
    };
    return FormAbstractCollectionDirective;
}(rxcomp_1.Directive));
exports.default = FormAbstractCollectionDirective;
