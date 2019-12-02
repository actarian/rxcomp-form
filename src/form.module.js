import { Module } from 'rxcomp';
import FormAccessor from './form/form-accessor';

export default class FormModule extends Module {}
const factories = [
	FormAccessor
];
const pipes = [
];
FormModule.meta = {
	declarations: [
		...factories,
		...pipes,
	],
	exports: [
		...factories,
		...pipes,
	]
};
