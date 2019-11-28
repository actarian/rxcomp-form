import { ClassDirective, EventDirective, ForStructure, IfStructure, InnerHtmlDirective, JsonPipe, Module, StyleDirective } from 'rxcomp';
import AppComponent from './app.component';
import FormAccessor from './form/form-accessor';

Module.use({
	factories: [
		ClassDirective,
		EventDirective,
		ForStructure,
		IfStructure,
		InnerHtmlDirective,
		StyleDirective,
		FormAccessor,
	],
	pipes: [
		JsonPipe,
	],
	bootstrap: AppComponent,
});
