import { Directive, IFactoryMeta } from 'rxcomp';
import { Observable } from 'rxjs';
/**
 * FormSubmitDirective.
 * @example
 * <form (submit)="onSubmit()" [formGroup]="form" role="form" novalidate autocomplete="off">
 * 	...
 * </form>
 */
export default class FormSubmitDirective extends Directive {
    event?: string;
    event$?: Observable<Event>;
    onInit(): void;
    static meta: IFactoryMeta;
}
