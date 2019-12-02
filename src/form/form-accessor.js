import { Component, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';

const AccessorProps = ['untouched', 'touched', 'pristine', 'dirty', 'pending', 'enabled', 'disabled', 'valid', 'invalid'];

// recall Directive
export default class FormAccessor extends Component {

	onInit() {
		// context
		const context = getContext(this);
		const node = context.node;
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
		// console.log('FormAccessor.onChanges', changes);
		const context = getContext(this);
		const node = context.node;
		// const key = node.getAttributeNode('formControl').value;
		const key = node.getAttributeNode('[name]').value;
		// console.log(key, this.formGroup);
		const control = this.formGroup.get(key);
		// const control = group.controls[key]; // FORM[key];
		control.value$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(value => {
			console.log('Accessor.control.valueChanges$', value);
		});
		control.status$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(status => {
			const pre = this.getPre(node);
			pre.textContent = '';
			AccessorProps.forEach(x => {
				if (control[x]) {
					node.classList.add(x);
					pre.textContent += x + ', ';
				} else {
					node.classList.remove(x);
				}
			});
			control.errors.forEach(x => pre.textContent += `invalid-${x}, `);
		});
		this.writeValue(control.value);
		// node.value = 'test';
	}

	writeValue(value) {
		const context = getContext(this);
		const node = context.node;
		node.setAttribute('value', value == null ? '' : value);
	}

	setDisabledState(disabled) {
		const context = getContext(this);
		const node = context.node;
		node.setAttribute('disabled', disabled);
	}

	getPre(node) {
		let pre = node.previousSibling;
		if (!pre || pre.nodeType !== 3) {
			pre = document.createTextNode('');
			node.parentNode.insertBefore(pre, node);
		}
		return pre;
	}

	onChange(event) {
		const context = getContext(this);
		const node = context.node;
		// const key = node.getAttributeNode('formControl').value;
		const key = node.getAttributeNode('[name]').value;
		const control = this.formGroup.get(key);
		// const control = group.controls[key]; // FORM[key];
		// event.currentTarget;
		// log(event.type, node.name, node.value, node.checked);
		// log('control', key, control.value);
		control.value = node.value;
	}

	onFocus(event) {}

	onBlur(event) {
		// log(event.type);
		const context = getContext(this);
		const node = context.node;
		// const key = node.getAttributeNode('formControl').value;
		const key = node.getAttributeNode('[name]').value;
		const control = this.formGroup.get(key);
		// const control = group.controls[key]; // FORM[key];
		control.touched = true;
	}
}

FormAccessor.meta = {
	selector: 'input,textarea,select',
	inputs: ['formGroup'],
};
