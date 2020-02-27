import { CoreModule, IModuleMeta, Module } from 'rxcomp';
import { FormModule } from '../../src/rxcomp-form';
import AppComponent from './app.component';
import ErrorsComponent from './errors/errors.component';

export default class AppModule extends Module {

	static meta: IModuleMeta = {
		imports: [
			CoreModule,
			FormModule
		],
		declarations: [
			ErrorsComponent
		],
		bootstrap: AppComponent,
	};

}
