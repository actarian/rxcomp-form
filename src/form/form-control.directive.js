import { Directive, getContext } from 'rxcomp';
import { FormAttributes } from './form-status';

export default class FormControlDirective extends Directive {

	get control() {
		if (this.formControl) {
			return this.formControl;
		} else {
			const { parentInstance } = getContext(this);
			if (!parentInstance.form) {
				throw ('missing form');
			}
			return parentInstance.form.get(this.formControlName);
		}
	}

	onInit() {
		const { node } = getContext(this);
		this.node = node;
		// log(node.getAttributeNode('formControl').value);
		// log('name', node.name);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		// this.onFocus = this.onFocus.bind(this);
		node.addEventListener('input', this.onChange);
		node.addEventListener('change', this.onChange);
		node.addEventListener('blur', this.onBlur);
		// node.addEventListener('focus', this.onFocus);
	}

	onChanges(changes) {
		const { node } = getContext(this);
		/*
		const pre = this.getPre(node);
		pre.textContent = '';
		*/
		const control = this.control;
		FormAttributes.forEach(x => {
			if (control[x]) {
				node.classList.add(x);
				// pre.textContent += x + ', ';
			} else {
				node.classList.remove(x);
			}
		});
		// control.errors.forEach(x => pre.textContent += `invalid-${x}, `);
		this.writeValue(control.value);
	}

	writeValue(value) {
		const { node } = getContext(this);
		// node.setAttribute('value', value == null ? '' : value);
		node.value = value == null ? '' : value;
		// console.log(node, node.getAttribute('value'));
	}

	setDisabledState(disabled) {
		const { node } = getContext(this);
		node.disabled = disabled;
		// node.setAttribute('disabled', disabled);
	}

	onChange(event) {
		const { node } = getContext(this);
		// log(event.type);
		this.control.value = node.value;
	}

	onFocus(event) {}

	onBlur(event) {
		// log(event.type);
		this.control.touched = true;
	}

	getPre(node) {
		let pre = node.previousSibling;
		if (!pre || pre.nodeType !== 3) {
			pre = document.createTextNode('');
			node.parentNode.insertBefore(pre, node);
		}
		return pre;
	}

}

FormControlDirective.meta = {
	selector: 'input,textarea,select',
	inputs: ['formControl', 'formControlName'],
};
