import { Directive, getContext } from 'rxcomp';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';

/**
 * @desc FormSubmitDirective.
 * @example
 * <form (submit)="onSubmit()" [formGroup]="form" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
export default class FormSubmitDirective extends Directive {

	event: string;
	event$: Observable<Event>;

	onInit() {
		const { module, node, selector, parentInstance } = getContext(this);
		const event = this.event = selector.replace(/\[|\]|\(|\)/g, '');
		const event$ = this.event$ = fromEvent(node, event).pipe(
			tap(event => {
				event.preventDefault();
			}),
			shareReplay(1)
		);
		const expression = node.getAttribute(`(${event})`);
		if (expression) {
			const outputFunction = module.makeFunction(expression, ['$event']);
			event$.pipe(
				takeUntil(this.unsubscribe$)
			).subscribe(event => {
				module.resolve(outputFunction, parentInstance, event);
			});
		} else {
			parentInstance[`${event}$`] = event$;
		}
		// console.log('parentInstance', parentInstance);
		// console.log('EventDirective.onInit', 'selector', selector, 'event', event);
	}

	static meta = {
		selector: `[(submit)]`,
	};

}
