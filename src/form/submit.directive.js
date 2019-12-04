import { Directive, getContext } from 'rxcomp';
import { fromEvent } from 'rxjs';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';

const EVENTS = ['submit'];

export default class SubmitDirective extends Directive {

	onInit() {
		const { module, node, selector, parentInstance } = getContext(this);
		const event = this.event = selector.replace(/\[|\]|\(|\)/g, '');
		const event$ = this.event$ = fromEvent(node, event).pipe(
			tap(event => {
				event.preventDefault();
				// console.log('event');
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

}

SubmitDirective.meta = {
	selector: `[(${EVENTS.join(')],[(')})]`,
};