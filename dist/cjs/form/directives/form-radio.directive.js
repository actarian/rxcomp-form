"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var form_abstract_collection_directive_1 = tslib_1.__importDefault(require("./form-abstract-collection.directive"));
var form_abstract_directive_1 = tslib_1.__importDefault(require("./form-abstract.directive"));
/**
 * FormRadioDirective.
 * @example
 * <input type="radio" [formControl]="control" name="radioGroup" value="one" />
 * <input type="radio" [formControl]="control" name="radioGroup" value="two" />
 * <input type="radio" [formControl]="control" name="radioGroup" value="three" />
 */
var FormRadioDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormRadioDirective, _super);
    function FormRadioDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormRadioDirective.prototype.onInit = function () {
        var _this = this;
        var node = rxcomp_1.getContext(this).node;
        // log(node.getAttributeNode('formControl').value);
        // log('name', node.name);
        // this.onChange = this.onChange.bind(this);
        // this.onBlur = this.onBlur.bind(this);
        // this.onFocus = this.onFocus.bind(this);
        // node.addEventListener('input', this.onChange);
        // node.addEventListener('change', this.onChange);
        // node.addEventListener('blur', this.onBlur);
        // node.addEventListener('focus', this.onFocus);
        // fromEvent<Event>(node, 'input').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onChange(event));
        rxjs_1.fromEvent(node, 'change').pipe(operators_1.takeUntil(this.unsubscribe$)).subscribe(function (event) { return _this.onChange(event); });
        rxjs_1.fromEvent(node, 'blur').pipe(operators_1.takeUntil(this.unsubscribe$)).subscribe(function (event) { return _this.onBlur(event); });
        // fromEvent<FocusEvent>(node, 'focus').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onFocus(event));
    };
    FormRadioDirective.prototype.writeValue = function (value) {
        var node = rxcomp_1.getContext(this).node;
        node.checked = (node.value === value);
    };
    FormRadioDirective.prototype.setDisabledState = function (disabled) {
        var node = rxcomp_1.getContext(this).node;
        node.disabled = disabled;
    };
    FormRadioDirective.prototype.onChange = function (event) {
        var node = rxcomp_1.getContext(this).node;
        if (node.checked) {
            this.control.value = node.value;
        }
    };
    FormRadioDirective.prototype.onBlur = function (event) {
        this.control.touched = true;
    };
    FormRadioDirective.meta = {
        selector: 'input[type=radio][formControl],input[type=radio][formControlName]',
        inputs: ['formControl', 'formControlName'],
        hosts: { host: form_abstract_collection_directive_1.default },
    };
    return FormRadioDirective;
}(form_abstract_directive_1.default));
exports.default = FormRadioDirective;
