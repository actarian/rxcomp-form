export function RequiredValidator(value) {
	// return (value == null || value.length === 0) ? { required: true } : null;
	return (value == null || value.length === 0) ? 'required' : null;
}
