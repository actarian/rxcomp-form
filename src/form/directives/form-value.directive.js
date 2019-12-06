import { Directive, getContext } from 'rxcomp';

export default class FormValueDirective extends Directive {

	onChanges(changes) {
		const { node } = getContext(this);
		node.value = this.value;
		console.log(this.value);
	}

}

FormValueDirective.meta = {
	selector: 'input[value], input[[value]], textarea[value], textarea[[value]]',
	inputs: ['value'],
};
