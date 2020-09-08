"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var form_abstract_collection_directive_1 = tslib_1.__importDefault(require("./form-abstract-collection.directive"));
/**
 * Abstract class representing a FormAbstractDirective.
 */
var FormAbstractDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormAbstractDirective, _super);
    function FormAbstractDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormAbstractDirective.prototype, "control", {
        get: function () {
            if (this.formControl) {
                return this.formControl;
            }
            else {
                if (!this.host) {
                    throw ('missing form collection');
                }
                return this.host.control.get(this.formControlName);
            }
        },
        enumerable: false,
        configurable: true
    });
    FormAbstractDirective.prototype.onInit = function () {
        var _this = this;
        var node = rxcomp_1.getContext(this).node;
        // this.onChange = this.onChange.bind(this);
        // this.onBlur = this.onBlur.bind(this);
        // this.onFocus = this.onFocus.bind(this);
        // node.addEventListener('input', this.onChange);
        // node.addEventListener('change', this.onChange);
        // node.addEventListener('blur', this.onBlur);
        // node.addEventListener('focus', this.onFocus);
        rxjs_1.fromEvent(node, 'input').pipe(operators_1.takeUntil(this.unsubscribe$)).subscribe(function (event) { return _this.onChange(event); });
        rxjs_1.fromEvent(node, 'change').pipe(operators_1.takeUntil(this.unsubscribe$)).subscribe(function (event) { return _this.onChange(event); });
        rxjs_1.fromEvent(node, 'blur').pipe(operators_1.takeUntil(this.unsubscribe$)).subscribe(function (event) { return _this.onBlur(event); });
        // fromEvent<FocusEvent>(node, 'focus').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onFocus(event));
    };
    FormAbstractDirective.prototype.onChanges = function (changes) {
        var node = rxcomp_1.getContext(this).node;
        if (this.formControlName) {
            node.name = this.formControlName;
        }
        /*
        // remove all invalids then
        Object.keys(control.errors).forEach(key => {
            node.classList.add(`invalid-${key}`);
        });
        */
        var control = this.control;
        var flags = control.flags;
        Object.keys(flags).forEach(function (key) {
            flags[key] ? node.classList.add(key) : node.classList.remove(key);
        });
        this.writeValue(control.value);
    };
    FormAbstractDirective.prototype.writeValue = function (value) {
        var node = rxcomp_1.getContext(this).node;
        // node.setAttribute('value', value == null ? '' : value);
        node.value = value == null ? '' : value;
    };
    FormAbstractDirective.prototype.onChange = function (event) {
        var node = rxcomp_1.getContext(this).node;
        this.control.value = node.value === '' ? null : node.value;
    };
    FormAbstractDirective.prototype.onBlur = function (event) {
        this.control.touched = true;
    };
    // onFocus(event) {}
    FormAbstractDirective.prototype.setDisabledState = function (disabled) {
        var node = rxcomp_1.getContext(this).node;
        node.disabled = disabled;
        // node.setAttribute('disabled', disabled);
    };
    FormAbstractDirective.meta = {
        selector: '',
        inputs: ['formControl', 'formControlName', 'value'],
        hosts: { host: form_abstract_collection_directive_1.default },
    };
    return FormAbstractDirective;
}(rxcomp_1.Directive));
exports.default = FormAbstractDirective;
/*

LEGACY
button: 		A push button with no default behavior.
checkbox: 		A check box allowing single values to be selected/deselected.
file: 			A control that lets the user select a file. Use the accept attribute to define the types of files that the control can select.
hidden: 		A control that is not displayed but whose value is submitted to the server.
image: 			A graphical submit button. You must use the src attribute to define the source of the image and the alt attribute to define alternative text. You can use the height and width attributes to define the size of the image in pixels.
password: 		A single-line text field whose value is obscured. Use the maxlength and minlength attributes to specify the maximum length of the value that can be entered.
                Note: Any forms involving sensitive information like passwords (e.g. login forms) should be served over HTTPS;
                Firefox now implements multiple mechanisms to warn against insecure login forms — see Insecure passwords.
                Other browsers are also implementing similar mechanisms.

radio: 			A radio button, allowing a single value to be selected out of multiple choices.
reset: 			A button that resets the contents of the form to default values.
submit: 		A button that submits the form.
text: 			A single-line text field. Line-breaks are automatically removed from the input value.

*/
/*

HTML5
color: 			(ie) A control for specifying a color. A color picker's UI has no required features other than accepting simple colors as text (more info).
date: 			(ie) A control for entering a date (year, month, and day, with no time).
datetime-local: (ie) A control for entering a date and time, with no time zone.
email: 			A field for editing an e-mail address.
month: 			(ie) A control for entering a month and year, with no time zone.
number: 		A control for entering a number.
range: 			A control for entering a number whose exact value is not important.
search: 		A single-line text field for entering search strings. Line-breaks are automatically removed from the input value.
tel: 			A control for entering a telephone number.
time: 			(ie) A control for entering a time value with no time zone.
url: 			A field for entering a URL.
week: 			(ie) A control for entering a date consisting of a week-year number and a week number with no time zone.

*/
/*

ATTRIBUTES
autocomplete	A string indicating the type of autocomplete functionality, if any, to allow on the input
autofocus		A Boolean which, if present, makes the input take focus when the form is presented
disabled		A Boolean attribute which is present if the input should be disabled
form			The id of the <form> of which the input is a member; if absent, the input is a member of the nearest containing form, or is not a member of a form at all
list			The id of a <datalist> element that provides a list of suggested values for the input
name			The input's name, to identify the input in the data submitted with the form's data
readonly		A Boolean attribute which, if true, indicates that the input cannot be edited
required		A Boolean which, if true, indicates that the input must have a value before the form can be submitted
tabindex		A numeric value providing guidance to the user agent as to the order in which controls receive focus when the user presses the Tab key
type			A string indicating which input type the <input> element represents
value			The input's current value

*/
