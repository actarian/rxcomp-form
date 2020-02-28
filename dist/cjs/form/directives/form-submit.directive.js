"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxcomp_1 = require("rxcomp");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * FormSubmitDirective.
 * @example
 * <form (submit)="onSubmit()" [formGroup]="form" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
var FormSubmitDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormSubmitDirective, _super);
    function FormSubmitDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormSubmitDirective.prototype.onInit = function () {
        var _a = rxcomp_1.getContext(this), module = _a.module, node = _a.node, selector = _a.selector, parentInstance = _a.parentInstance;
        var event = this.event = selector.replace(/\[|\]|\(|\)/g, '');
        var form = node;
        var event$ = this.event$ = rxjs_1.fromEvent(form, 'submit').pipe(operators_1.tap(function (event) {
            event.preventDefault();
        }), operators_1.shareReplay(1));
        var expression = node.getAttribute("(" + event + ")");
        if (expression) {
            var outputFunction_1 = module.makeFunction(expression, ['$event']);
            event$.pipe(operators_1.takeUntil(this.unsubscribe$) // !!!
            ).subscribe(function (event) {
                module.resolve(outputFunction_1, parentInstance, event);
            });
        }
        else {
            parentInstance[event + "$"] = event$; // !!! any
        }
        // console.log('parentInstance', parentInstance);
        // console.log('EventDirective.onInit', 'selector', selector, 'event', event);
    };
    FormSubmitDirective.meta = {
        selector: "[(submit)]",
    };
    return FormSubmitDirective;
}(rxcomp_1.Directive));
exports.default = FormSubmitDirective;
