"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
/**
 * FormPlaceholderDirective.
 * @example
 * <input type="text" [placeholder]="'item-' + index" />
 */
var FormPlaceholderDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormPlaceholderDirective, _super);
    function FormPlaceholderDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormPlaceholderDirective.prototype.onChanges = function (changes) {
        var node = rxcomp_1.getContext(this).node;
        node.setAttribute('placeholder', this.placeholder || '');
    };
    FormPlaceholderDirective.meta = {
        selector: 'input[placeholder],textarea[placeholder]',
        inputs: ['placeholder'],
    };
    return FormPlaceholderDirective;
}(rxcomp_1.Directive));
exports.default = FormPlaceholderDirective;
