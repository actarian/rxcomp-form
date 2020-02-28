import { Directive, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
/**
 * FormSubmitDirective.
 * @example
 * <form (submit)="onSubmit()" [formGroup]="form" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
export default class FormSubmitDirective extends Directive {
    onInit() {
        const { module, node, selector, parentInstance } = getContext(this);
        const event = this.event = selector.replace(/\[|\]|\(|\)/g, '');
        const form = node;
        const event$ = this.event$ = fromEvent(form, 'submit').pipe(tap(event => {
            event.preventDefault();
        }), shareReplay(1));
        const expression = node.getAttribute(`(${event})`);
        if (expression) {
            const outputFunction = module.makeFunction(expression, ['$event']);
            event$.pipe(takeUntil(this.unsubscribe$) // !!!
            ).subscribe(event => {
                module.resolve(outputFunction, parentInstance, event);
            });
        }
        else {
            parentInstance[`${event}$`] = event$; // !!! any
        }
        // console.log('parentInstance', parentInstance);
        // console.log('EventDirective.onInit', 'selector', selector, 'event', event);
    }
}
FormSubmitDirective.meta = {
    selector: `[(submit)]`,
};
