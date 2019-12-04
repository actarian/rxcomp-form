import { Browser } from 'rxcomp';
import AppModule from './app.module';

/*
// fixing
Module.prototype.makeInputs = function(meta, instance) {
	const inputs = {};
	if (meta.inputs) {
		meta.inputs.forEach((key, i) => {
			const input = this.makeInput(instance, key);
			if (input) {
				inputs[key] = input;
			}
		});
	}
	return inputs;
};

// fixing
Module.prototype.makeInput = function(instance, key) {
	const { node } = getContext(instance);
	let input, expression = null;
	if (node.hasAttribute(key)) {
		expression = `'${node.getAttribute(key)}'`;
	} else if (node.hasAttribute(`[${key}]`)) {
		expression = node.getAttribute(`[${key}]`);
	}
	if (expression !== null) {
		input = this.makeFunction(expression);
	}
	return input;
};

// fixing
Module.prototype.getInstance = function(node) {
	if (node === document) {
		return window;
	}
	const context = getContextByNode(node); // !!!
	if (context) {
		return context.instance;
	}
};

// fixing
Module.prototype.getParentInstance = function(node) {
	return Module.traverseUp(node, (node) => {
		return this.getInstance(node);
	});
};
*/

Browser.bootstrap(AppModule);
