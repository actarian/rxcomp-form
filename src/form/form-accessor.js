import { Directive, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { FormAttributes } from './form-status';

export default class FormAccessor extends Directive {

	getFormRef(parentFormRef) {
		// console.log('formControlName', this.formControlName, 'formControl', this.formControl, 'parentFormRef', parentFormRef);
		return this.formControlName ? parentFormRef.get(this.formControlName) : this.formControl;
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
		// console.log('FormAccessor.onChanges', changes);
		const { node } = getContext(this);
		// const key = node.getAttributeNode('[name]').value;
		const formRef = this.getFormRef(changes.formRef);
		// changes.formRef = formRef;
		this.formRef = formRef;
		// console.log('FormAccessor.formRef', formRef, 'changes', changes);
		formRef.value$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(value => {
			// console.log('Accessor.formRef.valueChanges$', value);
		});
		formRef.status$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(status => {
			/*
			const pre = this.getPre(node);
			pre.textContent = '';
			*/
			FormAttributes.forEach(x => {
				if (formRef[x]) {
					node.classList.add(x);
					// pre.textContent += x + ', ';
				} else {
					node.classList.remove(x);
				}
			});
			// formRef.errors.forEach(x => pre.textContent += `invalid-${x}, `);
		});
		this.writeValue(formRef.value);
		// node.value = 'test';
	}

	writeValue(value) {
		const { node } = getContext(this);
		node.setAttribute('value', value == null ? '' : value);
	}

	setDisabledState(disabled) {
		const { node } = getContext(this);
		node.setAttribute('disabled', disabled);
	}

	onChange(event) {
		const { node } = getContext(this);
		// log(event.type);
		// log('formRef', this.formRef);
		this.formRef.value = node.value;
	}

	onFocus(event) {}

	onBlur(event) {
		// log(event.type);
		// log('formRef', this.formRef);
		this.formRef.touched = true;
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

FormAccessor.meta = {
	selector: 'input,textarea,select',
	inputs: ['formControl', 'formControlName'],
};
