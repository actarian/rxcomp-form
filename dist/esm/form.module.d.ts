import { IModuleMeta, Module } from 'rxcomp';
/**
 * FormModule Class.
 * @example
 * export default class AppModule extends Module {}
 *
 * AppModule.meta = {
 *  imports: [
 *   CoreModule,
 *   FormModule
 *  ],
 *  declarations: [
 *   ErrorsComponent
 *  ],
 *  bootstrap: AppComponent,
 * };
 * @extends Module
 */
export default class FormModule extends Module {
    static meta: IModuleMeta;
}
