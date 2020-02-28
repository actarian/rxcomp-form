import FormValidator from './form-validator';
/**
 * a null validator
 */
export declare function NullValidator(): FormValidator;
/**
 * a required validator
 */
export declare function RequiredValidator(): FormValidator;
/**
 * a required and true validator
 */
export declare function RequiredTrueValidator(): FormValidator;
/**
 * a min number value validator
 */
export declare function MinValidator(min: number): FormValidator;
/**
 * a max number value validator
 */
export declare function MaxValidator(max: number): FormValidator;
/**
 * a min string length validator
 */
export declare function MinLengthValidator(minlength: number): FormValidator;
/**
 * a max string length validator
 */
export declare function MaxLengthValidator(maxlength: number): FormValidator;
/**
 * a regex pattern validator
 */
export declare function PatternValidator(pattern: string | RegExp): FormValidator;
/**
 * an email pattern validator
 */
export declare function EmailValidator(): FormValidator;
