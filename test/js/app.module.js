import { CoreModule, Module } from 'rxcomp';
import { FormModule } from '../../src/rxcomp-form';
import AppComponent from './app.component';
import ErrorsComponent from './errors/errors.component';

export default class AppModule extends Module {}

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule
	],
	declarations: [
		ErrorsComponent
	],
	bootstrap: AppComponent,
};
