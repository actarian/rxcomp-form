/**
 * @license rxcomp-form v1.0.0-beta.2
 * (c) 2020 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('rxcomp'), require('rxjs'), require('rxjs/operators')) :
  typeof define === 'function' && define.amd ? define('main', ['rxcomp', 'rxjs', 'rxjs/operators'], factory) :
  (global = global || self, factory(global.rxcomp, global.rxjs, global.rxjs.operators));
}(this, (function (rxcomp, rxjs, operators) { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var FormStatus = {
    Pending: 'pending',
    Valid: 'valid',
    Invalid: 'invalid',
    Disabled: 'disabled',
    Hidden: 'hidden'
  };
  var FormAttributes = ['untouched', 'touched', 'pristine', 'dirty', 'pending', 'enabled', 'disabled', 'hidden', 'visible', 'valid', 'invalid', 'submitted'];

  /**
   * @desc Abstract class representing a FormAbstractCollectionDirective.
   * @abstract
   * @access public
   */

  var FormAbstractCollectionDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormAbstractCollectionDirective, _Directive);

    function FormAbstractCollectionDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormAbstractCollectionDirective.prototype;

    _proto.onChanges = function onChanges(changes) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      var control = this.control;
      FormAttributes.forEach(function (x) {
        if (control[x]) {
          node.classList.add(x);
        } else {
          node.classList.remove(x);
        }
      });
    };

    _createClass(FormAbstractCollectionDirective, [{
      key: "control",
      get: function get() {
        return {};
      }
    }]);

    return FormAbstractCollectionDirective;
  }(rxcomp.Directive);
  FormAbstractCollectionDirective.meta = {
    // no selection, abstract class
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  /**
   * @desc FormArrayDirective.
   * @example
   * <form [formArray]="form" (submit)="onSubmit()" role="form" novalidate autocomplete="off">
   * 	...
   * </form>
   */

  var FormArrayDirective =
  /*#__PURE__*/
  function (_FormAbstractCollecti) {
    _inheritsLoose(FormArrayDirective, _FormAbstractCollecti);

    function FormArrayDirective() {
      return _FormAbstractCollecti.apply(this, arguments) || this;
    }

    _createClass(FormArrayDirective, [{
      key: "control",
      get: function get() {
        // console.log('FormArrayDirective', (this.formArrayName ? `formArrayName ${this.formArrayName}` : `formArray ${this.formArray}`));
        if (this.formArray) {
          return this.formArray;
        } else {
          if (!this.host) {
            throw 'missing form collection';
          }

          return this.host.control.get(this.formArrayName);
        }
      }
    }]);

    return FormArrayDirective;
  }(FormAbstractCollectionDirective);
  FormArrayDirective.meta = {
    selector: '[formArray],[formArrayName]',
    inputs: ['formArray', 'formArrayName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  /**
   * @desc Abstract class representing a FormAbstractDirective.
   * @abstract
   * @access public
   */

  var FormAbstractDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormAbstractDirective, _Directive);

    function FormAbstractDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormAbstractDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      this.node = node;
      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this); // this.onFocus = this.onFocus.bind(this);

      node.addEventListener('input', this.onChange);
      node.addEventListener('change', this.onChange);
      node.addEventListener('blur', this.onBlur); // node.addEventListener('focus', this.onFocus);
    };

    _proto.onChanges = function onChanges(changes) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      if (this.formControlName) {
        node.name = this.formControlName;
      }

      var control = this.control;
      /*
      // remove all invalids then
      Object.keys(control.errors).forEach(key => {
      	node.classList.add(`invalid-${key}`);
      });
      */

      FormAttributes.forEach(function (x) {
        if (control[x]) {
          node.classList.add(x);
        } else {
          node.classList.remove(x);
        }
      });
      this.writeValue(control.value);
    };

    _proto.writeValue = function writeValue(value) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node; // node.setAttribute('value', value == null ? '' : value);


      node.value = value == null ? '' : value;
    };

    _proto.onChange = function onChange(event) {
      var _getContext4 = rxcomp.getContext(this),
          node = _getContext4.node;

      this.control.value = node.value === '' ? null : node.value;
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    } // onFocus(event) {}
    ;

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext5 = rxcomp.getContext(this),
          node = _getContext5.node;

      node.disabled = disabled; // node.setAttribute('disabled', disabled);
    };

    _createClass(FormAbstractDirective, [{
      key: "control",
      get: function get() {
        if (this.formControl) {
          return this.formControl;
        } else {
          if (!this.host) {
            throw 'missing form collection';
          }

          return this.host.control.get(this.formControlName);
        }
      }
    }]);

    return FormAbstractDirective;
  }(rxcomp.Directive);
  FormAbstractDirective.meta = {
    // no selection, abstract class
    inputs: ['formControl', 'formControlName', 'value'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };
  /*

  LEGACY
  button: 		A push button with no default behavior.
  checkbox: 		A check box allowing single values to be selected/deselected.
  file: 			A control that lets the user select a file. Use the accept attribute to define the types of files that the control can select.
  hidden: 		A control that is not displayed but whose value is submitted to the server.
  image: 			A graphical submit button. You must use the src attribute to define the source of the image and the alt attribute to define alternative text. You can use the height and width attributes to define the size of the image in pixels.
  password: 		A single-line text field whose value is obscured. Use the maxlength and minlength attributes to specify the maximum length of the value that can be entered.
  				Note: Any forms involving sensitive information like passwords (e.g. login forms) should be served over HTTPS;
  				Firefox now implements multiple mechanisms to warn against insecure login forms — see Insecure passwords.
  				Other browsers are also implementing similar mechanisms.

  radio: 			A radio button, allowing a single value to be selected out of multiple choices.
  reset: 			A button that resets the contents of the form to default values.
  submit: 		A button that submits the form.
  text: 			A single-line text field. Line-breaks are automatically removed from the input value.

  */

  /*

  HTML5
  color: 			(ie) A control for specifying a color. A color picker's UI has no required features other than accepting simple colors as text (more info).
  date: 			(ie) A control for entering a date (year, month, and day, with no time).
  datetime-local: (ie) A control for entering a date and time, with no time zone.
  email: 			A field for editing an e-mail address.
  month: 			(ie) A control for entering a month and year, with no time zone.
  number: 		A control for entering a number.
  range: 			A control for entering a number whose exact value is not important.
  search: 		A single-line text field for entering search strings. Line-breaks are automatically removed from the input value.
  tel: 			A control for entering a telephone number.
  time: 			(ie) A control for entering a time value with no time zone.
  url: 			A field for entering a URL.
  week: 			(ie) A control for entering a date consisting of a week-year number and a week number with no time zone.

  */

  /*

  ATTRIBUTES
  autocomplete	A string indicating the type of autocomplete functionality, if any, to allow on the input
  autofocus		A Boolean which, if present, makes the input take focus when the form is presented
  disabled		A Boolean attribute which is present if the input should be disabled
  form			The id of the <form> of which the input is a member; if absent, the input is a member of the nearest containing form, or is not a member of a form at all
  list			The id of a <datalist> element that provides a list of suggested values for the input
  name			The input's name, to identify the input in the data submitted with the form's data
  readonly		A Boolean attribute which, if true, indicates that the input cannot be edited
  required		A Boolean which, if true, indicates that the input must have a value before the form can be submitted
  tabindex		A numeric value providing guidance to the user agent as to the order in which controls receive focus when the user presses the Tab key
  type			A string indicating which input type the <input> element represents
  value			The input's current value

  */

  /**
   * @desc FormCheckboxDirective.
   * @example
   * <input type="checkbox" formControlName="privacy" [value]="true" requiredTrue />
   * @example
   * <input type="checkbox" [formControl]="control" [value]="true" requiredTrue />
   */

  var FormCheckboxDirective =
  /*#__PURE__*/
  function (_FormAbstractDirectiv) {
    _inheritsLoose(FormCheckboxDirective, _FormAbstractDirectiv);

    function FormCheckboxDirective() {
      return _FormAbstractDirectiv.apply(this, arguments) || this;
    }

    var _proto = FormCheckboxDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      this.node = node; // log(node.getAttributeNode('formControl').value);
      // log('name', node.name);

      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this); // this.onFocus = this.onFocus.bind(this);

      node.addEventListener('input', this.onChange); // node.addEventListener('change', this.onChange);

      node.addEventListener('blur', this.onBlur); // node.addEventListener('focus', this.onFocus);
    };

    _proto.writeValue = function writeValue(value) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      value === this.value ? node.setAttribute('checked', value) : node.removeAttribute('checked');
      /*
      const checked = (node.value === value);
      if (node.checked !== checked) {
      	node.checked = checked;
      }
      */
    };

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node;

      node.disabled = disabled;
    };

    _proto.onChange = function onChange(event) {
      var _getContext4 = rxcomp.getContext(this),
          node = _getContext4.node;

      this.control.value = node.checked ? this.value : this.value === true ? false : null;
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    } // onFocus(event) {}
    ;

    return FormCheckboxDirective;
  }(FormAbstractDirective);
  FormCheckboxDirective.meta = {
    selector: 'input[type=checkbox][formControl],input[type=checkbox][formControlName]',
    inputs: ['formControl', 'formControlName', 'value'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };
  /*

  ATTRIBUTES
  autocomplete	A string indicating the type of autocomplete functionality, if any, to allow on the input
  autofocus		A Boolean which, if present, makes the input take focus when the form is presented
  disabled		A Boolean attribute which is present if the input should be disabled
  form			The id of the <form> of which the input is a member; if absent, the input is a member of the nearest containing form, or is not a member of a form at all
  list			The id of a <datalist> element that provides a list of suggested values for the input
  name			The input's name, to identify the input in the data submitted with the form's data
  readonly		A Boolean attribute which, if true, indicates that the input cannot be edited
  required		A Boolean which, if true, indicates that the input must have a value before the form can be submitted
  tabindex		A numeric value providing guidance to the user agent as to the order in which controls receive focus when the user presses the Tab key
  type			A string indicating which input type the <input> element represents
  value			The input's current value

  */

  /**
   * @desc FormFieldComponent.
   * @example
   * <div formFieldName="firstName">
   *	<input type="text" [formControl]="control" />
   * </div>
   */

  var FormFieldComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(FormFieldComponent, _Component);

    function FormFieldComponent() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = FormFieldComponent.prototype;

    _proto.onChanges = function onChanges(changes) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      var control = this.control;
      FormAttributes.forEach(function (x) {
        if (control[x]) {
          node.classList.add(x);
        } else {
          node.classList.remove(x);
        }
      });
    };

    _createClass(FormFieldComponent, [{
      key: "control",
      get: function get() {
        // console.log('FormFieldComponent', (this.formFieldName ? `formFieldName ${this.formFieldName}` : `formField ${this.formField}`));
        if (this.formField) {
          return this.formField;
        } else {
          if (!this.host) {
            throw 'missing form collection';
          }

          return this.host.control.get(this.formFieldName);
        }
      }
    }]);

    return FormFieldComponent;
  }(rxcomp.Component);
  FormFieldComponent.meta = {
    selector: '[formField],[formFieldName]',
    inputs: ['formField', 'formFieldName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  /**
   * @desc FormGroupDirective.
   * @example
   * <form [formGroup]="form" (submit)="onSubmit()" role="form" novalidate autocomplete="off">
   * 	...
   * </form>
   */

  var FormGroupDirective =
  /*#__PURE__*/
  function (_FormAbstractCollecti) {
    _inheritsLoose(FormGroupDirective, _FormAbstractCollecti);

    function FormGroupDirective() {
      return _FormAbstractCollecti.apply(this, arguments) || this;
    }

    _createClass(FormGroupDirective, [{
      key: "control",
      get: function get() {
        // console.log('FormGroupDirective', (this.formGroupName ? `formGroupName ${this.formGroupName}` : `formGroup ${this.formGroup}`));
        if (this.formGroup) {
          return this.formGroup;
        } else {
          if (!this.host) {
            throw 'missing form collection';
          }

          return this.host.control.get(this.formGroupName);
        }
      }
    }]);

    return FormGroupDirective;
  }(FormAbstractCollectionDirective);
  FormGroupDirective.meta = {
    selector: '[formGroup],[formGroupName]',
    inputs: ['formGroup', 'formGroupName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  /**
   * @desc FormInputDirective to handle input text FormControl value.
   * @example
   * <input type="text" formControlName="firstName" />
   * @example
   * <input type="text" [formControl]="form.get('firstName')" />
   */

  var FormInputDirective =
  /*#__PURE__*/
  function (_FormAbstractDirectiv) {
    _inheritsLoose(FormInputDirective, _FormAbstractDirectiv);

    function FormInputDirective() {
      return _FormAbstractDirectiv.apply(this, arguments) || this;
    }

    var _proto = FormInputDirective.prototype;

    _proto.writeValue = function writeValue(value) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      node.value = value == null ? '' : value;
    };

    _proto.onChange = function onChange(event) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      this.control.value = node.value === '' ? null : node.value;
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    };

    return FormInputDirective;
  }(FormAbstractDirective);
  FormInputDirective.meta = {
    selector: 'input[type=text][formControl],input[type=text][formControlName],input[type=email][formControl],input[type=email][formControlName],input[type=password][formControl],input[type=password][formControlName],textarea[formControl],textarea[formControlName]',
    inputs: ['formControl', 'formControlName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  /**
   * @desc FormPlaceholderDirective.
   * @example
   * <input type="text" [placeholder]="'item-' + index" />
   */

  var FormPlaceholderDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormPlaceholderDirective, _Directive);

    function FormPlaceholderDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormPlaceholderDirective.prototype;

    _proto.onChanges = function onChanges(changes) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      node.placeholder = this.placeholder;
    };

    return FormPlaceholderDirective;
  }(rxcomp.Directive);
  FormPlaceholderDirective.meta = {
    selector: 'input[placeholder],textarea[placeholder]',
    inputs: ['placeholder']
  };

  /**
   * @desc FormRadioDirective.
   * @example
   * <input type="radio" [formControl]="control" name="radioGroup" value="one" />
   * <input type="radio" [formControl]="control" name="radioGroup" value="two" />
   * <input type="radio" [formControl]="control" name="radioGroup" value="three" />
   */

  var FormRadioDirective =
  /*#__PURE__*/
  function (_FormAbstractDirectiv) {
    _inheritsLoose(FormRadioDirective, _FormAbstractDirectiv);

    function FormRadioDirective() {
      return _FormAbstractDirectiv.apply(this, arguments) || this;
    }

    var _proto = FormRadioDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      this.node = node; // log(node.getAttributeNode('formControl').value);
      // log('name', node.name);

      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this); // this.onFocus = this.onFocus.bind(this);

      node.addEventListener('input', this.onChange); // node.addEventListener('change', this.onChange);

      node.addEventListener('blur', this.onBlur); // node.addEventListener('focus', this.onFocus);
    };

    _proto.writeValue = function writeValue(value) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      node.checked = node.value === value;
    };

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node;

      node.disabled = disabled;
    };

    _proto.onChange = function onChange(event) {
      var _getContext4 = rxcomp.getContext(this),
          node = _getContext4.node;

      if (node.checked) {
        this.control.value = node.value;
      }
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    };

    return FormRadioDirective;
  }(FormAbstractDirective);
  FormRadioDirective.meta = {
    selector: 'input[type=radio][formControl],input[type=radio][formControlName]',
    inputs: ['formControl', 'formControlName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  /**
   * @desc FormSelectDirective.
   * @example
   * <select formControlName="country">
   * 	<option value="">select</option>
   * 	<option value="en-US">English</option>
   * 	<option value="it-IT">Italiano</option>
   * </select>
   * @example
   * <select [formControl]="control">
   * 	<option value="">select</option>
   * 	<option value="en-US">English</option>
   * 	<option value="it-IT">Italiano</option>
   * </select>
   */

  var FormSelectDirective =
  /*#__PURE__*/
  function (_FormAbstractDirectiv) {
    _inheritsLoose(FormSelectDirective, _FormAbstractDirectiv);

    function FormSelectDirective() {
      return _FormAbstractDirectiv.apply(this, arguments) || this;
    }

    var _proto = FormSelectDirective.prototype;

    _proto.writeValue = function writeValue(value) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      node.value = value == null ? '' : value;
    };

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      node.disabled = disabled;
    };

    _proto.onChange = function onChange(event) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node;

      this.control.value = node.value === '' ? null : node.value;
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    };

    return FormSelectDirective;
  }(FormAbstractDirective);
  FormSelectDirective.meta = {
    selector: 'select[formControl],select[formControlName]',
    inputs: ['formControl', 'formControlName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  /**
   * @desc FormSubmitDirective.
   * @example
   * <form (submit)="onSubmit()" [formGroup]="form" role="form" novalidate autocomplete="off">
   * 	...
   * </form>
   */

  var FormSubmitDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormSubmitDirective, _Directive);

    function FormSubmitDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormSubmitDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          module = _getContext.module,
          node = _getContext.node,
          selector = _getContext.selector,
          parentInstance = _getContext.parentInstance;

      var event = this.event = selector.replace(/\[|\]|\(|\)/g, '');
      var event$ = this.event$ = rxjs.fromEvent(node, event).pipe(operators.tap(function (event) {
        event.preventDefault(); // console.log('event');
      }), operators.shareReplay(1));
      var expression = node.getAttribute("(" + event + ")");

      if (expression) {
        var outputFunction = module.makeFunction(expression, ['$event']);
        event$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
          module.resolve(outputFunction, parentInstance, event);
        });
      } else {
        parentInstance[event + "$"] = event$;
      } // console.log('parentInstance', parentInstance);
      // console.log('EventDirective.onInit', 'selector', selector, 'event', event);

    };

    return FormSubmitDirective;
  }(rxcomp.Directive);
  FormSubmitDirective.meta = {
    selector: "[(submit)]"
  };

  /**
   * @desc FormValidator class representing a form validator.
   * @example
   * export function EqualValidator(equal) {
   * 	return new FormValidator(function(value) {
   * 		const equal = this.params.equal;
   * 		if (!value || !equal) {
   * 			return null;
   * 		}
   * 		return value !== equal ? { equal: { equal: equal, actual: value } } : null;
   * 	}, { equal });
   * }
   */

  var FormValidator =
  /*#__PURE__*/
  function () {
    _createClass(FormValidator, [{
      key: "params",

      /**
       * params getter
       * @return {any} params
       */
      get: function get() {
        return this.params$.getValue();
      }
      /**
       * params setter
       * @param {any} params
       */
      ,
      set: function set(params) {
        if (params) {
          var current = this.params;
          var differs = Object.keys(params).reduce(function (flag, key) {
            return flag || !current || current[key] !== params[key];
          }, false);

          if (differs) {
            // if (JSON.stringify(params) !== JSON.stringify(this.params)) {
            this.params$.next(params);
          }
        }
      }
      /**
       * Create a FormValidator.
       * @abstract
       */

    }]);

    function FormValidator(validator, params) {
      this.validator = validator.bind(this);
      this.params$ = new rxjs.BehaviorSubject(params);
    }
    /**
     * validate a value
     * @param {any} value - the value to validate
     * @return {null|FormValidationError}
     */


    var _proto = FormValidator.prototype;

    _proto.validate = function validate(value) {
      return this.validator(value);
    };

    return FormValidator;
  }();

  /**
   * a required validator
   * @return {null|FormValidationError}
   */

  function RequiredValidator() {
    return new FormValidator(function (value) {
      // console.log('RequiredValidator', value, (value == null || value.length === 0) ? { required: true } : null);
      return value == null || value.length === 0 ? {
        required: true
      } : null;
    }); // return (value == null || value.length === 0) ? 'required' : null;
  }
  /**
   * a required and true validator
   * @return {null|FormValidationError}
   */

  function RequiredTrueValidator() {
    return new FormValidator(function (value) {
      // console.log('RequiredTrueValidator', value, value === true ? null : { required: true });
      return value === true ? null : {
        required: true
      };
    });
  }
  /**
   * a min number value validator
   * @return {null|FormValidationError}
   */

  function MinValidator(min) {
    return new FormValidator(function (value) {
      var min = this.params.min;

      if (!value || !min) {
        return null;
      }

      value = parseFloat(value);
      return !isNaN(value) && value < min ? {
        min: {
          min: min,
          actual: value
        }
      } : null;
    }, {
      min: min
    });
  }
  /**
   * a max number value validator
   * @return {null|FormValidationError}
   */

  function MaxValidator(max) {
    return new FormValidator(function (value) {
      var max = this.params.max;

      if (!value || !max) {
        return null;
      }

      value = parseFloat(value);
      return !isNaN(value) && value > max ? {
        max: {
          max: max,
          actual: value
        }
      } : null;
    }, {
      max: max
    });
  }
  /**
   * a min string length validator
   * @return {null|FormValidationError}
   */

  function MinLengthValidator(minlength) {
    return new FormValidator(function (value) {
      var minlength = this.params.minlength;

      if (!value || !minlength) {
        return null;
      }

      var length = value ? value.length : 0;
      return length < minlength ? {
        minlength: {
          requiredLength: minlength,
          actualLength: length
        }
      } : null;
    }, {
      minlength: minlength
    });
  }
  /**
   * a max string length validator
   * @return {null|FormValidationError}
   */

  function MaxLengthValidator(maxlength) {
    return new FormValidator(function (value) {
      var maxlength = this.params.maxlength;

      if (!value || !maxlength) {
        return null;
      }

      var length = value ? value.length : 0;
      return length > maxlength ? {
        minlength: {
          requiredLength: maxlength,
          actualLength: length
        }
      } : null;
    }, {
      maxlength: maxlength
    });
  }
  /**
   * a regex pattern validator
   * @return {null|FormValidationError}
   */

  function PatternValidator(pattern) {
    return new FormValidator(function (value) {
      var pattern = this.params.pattern;

      if (!value || !pattern) {
        return null;
      }

      var regex = patternToRegEx(pattern);
      return regex.test(value) ? null : {
        pattern: {
          requiredPattern: regex.toString(),
          actualValue: value
        }
      };
    }, {
      pattern: pattern
    });
  }
  /**
   * an email pattern validator
   * @return {null|FormValidationError}
   */

  function EmailValidator(value) {
    var regex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return new FormValidator(function (value) {
      if (!value) {
        return null;
      }

      return regex.test(value) ? null : {
        email: true
      };
    });
  }

  function patternToRegEx(pattern) {
    var regex;

    if (pattern instanceof RegExp) {
      regex = pattern;
    } else if (typeof pattern === 'string') {
      pattern = pattern.charAt(0) === '^' ? pattern : "^" + pattern;
      pattern = pattern.charAt(pattern.length - 1) === '$' ? pattern : pattern + "$";
      regex = new RegExp(pattern);
    }

    return regex;
  }

  /**
   * @desc FormEmailDirective attribute for injecting EmailValidator.
   * @example
   * <input type="text" formControlName="email" email />
   */

  var FormEmailDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormEmailDirective, _Directive);

    function FormEmailDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormEmailDirective.prototype;

    _proto.onInit = function onInit() {
      // console.log('FormEmailDirective', this.host.control);
      var validator = this.validator = EmailValidator();
      this.host.control.addValidators(validator);
    };

    return FormEmailDirective;
  }(rxcomp.Directive);
  FormEmailDirective.meta = {
    selector: '[email][formControl],[email][formControlName]',
    inputs: ['email'],
    hosts: {
      host: FormAbstractDirective
    }
  };

  /**
   * @desc FormMaxLengthDirective attribute for injecting MaxLengthValidator.
   * @example
   * <input type="text" formControlName="card" maxlength="12" />
   */

  var FormMaxLengthDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormMaxLengthDirective, _Directive);

    function FormMaxLengthDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormMaxLengthDirective.prototype;

    _proto.onInit = function onInit() {
      // console.log('FormMaxLengthDirective.onInit', this.maxlength);
      var validator = this.validator = MaxLengthValidator(this.maxlength);
      this.host.control.addValidators(this.validator);
    };

    _proto.onChanges = function onChanges(changes) {
      // console.log('FormMaxLengthDirective.onChanges', this.maxlength);
      this.validator.params = {
        maxlength: this.maxlength
      };
    };

    return FormMaxLengthDirective;
  }(rxcomp.Directive);
  FormMaxLengthDirective.meta = {
    selector: '[maxlength][formControl],[maxlength][formControlName]',
    inputs: ['maxlength'],
    hosts: {
      host: FormAbstractDirective
    }
  };

  /**
   * @desc FormMaxDirective attribute for injecting MaxValidator.
   * @example
   * <input type="number" formControlName="qty" max="12" />
   */

  var FormMaxDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormMaxDirective, _Directive);

    function FormMaxDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormMaxDirective.prototype;

    _proto.onInit = function onInit() {
      // console.log('FormMaxDirective.onInit', this.max);
      var validator = this.validator = MaxValidator(this.max);
      this.host.control.addValidators(this.validator);
    };

    _proto.onChanges = function onChanges(changes) {
      // console.log('FormMaxDirective.onChanges', this.max);
      this.validator.params = {
        max: this.max
      };
    };

    return FormMaxDirective;
  }(rxcomp.Directive);
  FormMaxDirective.meta = {
    selector: '[max][formControl],[max][formControlName]',
    inputs: ['max'],
    hosts: {
      host: FormAbstractDirective
    }
  };

  /**
   * @desc FormMinLengthDirective attribute for injecting MinLengthValidator.
   * @example
   * <input type="text" formControlName="card" minlength="12" />
   */

  var FormMinLengthDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormMinLengthDirective, _Directive);

    function FormMinLengthDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormMinLengthDirective.prototype;

    _proto.onInit = function onInit() {
      // console.log('FormMinLengthDirective.onInit', this.minlength);
      var validator = this.validator = MinLengthValidator(this.minlength);
      this.host.control.addValidators(this.validator);
    };

    _proto.onChanges = function onChanges(changes) {
      // console.log('FormMinLengthDirective.onChanges', this.minlength);
      this.validator.params = {
        minlength: this.minlength
      };
    };

    return FormMinLengthDirective;
  }(rxcomp.Directive);
  FormMinLengthDirective.meta = {
    selector: '[minlength][formControl],[minlength][formControlName]',
    inputs: ['minlength'],
    hosts: {
      host: FormAbstractDirective
    }
  };

  /**
   * @desc FormMinDirective attribute for injecting MinValidator.
   * @example
   * <input type="number" formControlName="qty" min="1" />
   */

  var FormMinDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormMinDirective, _Directive);

    function FormMinDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormMinDirective.prototype;

    _proto.onInit = function onInit() {
      // console.log('FormMinDirective.onInit', this.min);
      var validator = this.validator = MinValidator(this.min);
      this.host.control.addValidators(this.validator);
    };

    _proto.onChanges = function onChanges(changes) {
      // console.log('FormMinDirective.onChanges', this.min);
      this.validator.params = {
        min: this.min
      };
    };

    return FormMinDirective;
  }(rxcomp.Directive);
  FormMinDirective.meta = {
    selector: '[min][formControl],[min][formControlName]',
    inputs: ['min'],
    hosts: {
      host: FormAbstractDirective
    }
  };

  /**
   * @desc FormPatternDirective attribute for injecting PatternValidator.
   * @example
   * <input type="text" formControlName="visa" pattern="^4[0-9]{12}(?:[0-9]{3})?$" />
   */

  var FormPatternDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormPatternDirective, _Directive);

    function FormPatternDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormPatternDirective.prototype;

    _proto.onInit = function onInit() {
      // console.log('FormPatternDirective.onInit', this.pattern);
      var validator = this.validator = PatternValidator(this.pattern);
      this.host.control.addValidators(this.validator);
    };

    _proto.onChanges = function onChanges(changes) {
      // console.log('FormPatternDirective.onChanges', this.pattern);
      this.validator.params = {
        pattern: this.pattern
      };
    };

    return FormPatternDirective;
  }(rxcomp.Directive);
  FormPatternDirective.meta = {
    selector: '[pattern][formControl],[pattern][formControlName]',
    inputs: ['pattern'],
    hosts: {
      host: FormAbstractDirective
    }
  };

  /**
   * @desc FormRequiredTrueDirective attribute for injecting RequiredTrueValidator.
   * @example
   * <input type="checkbox" formControlName="privacy" requiredTrue />
   */

  var FormRequiredTrueDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormRequiredTrueDirective, _Directive);

    function FormRequiredTrueDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormRequiredTrueDirective.prototype;

    _proto.onInit = function onInit() {
      // console.log('FormRequiredTrueDirective', this.host.control);
      var validator = this.validator = RequiredTrueValidator();
      this.host.control.addValidators(validator);
    };

    return FormRequiredTrueDirective;
  }(rxcomp.Directive);
  FormRequiredTrueDirective.meta = {
    selector: '[requiredTrue][formControl],[requiredTrue][formControlName]',
    inputs: ['requiredTrue'],
    hosts: {
      host: FormAbstractDirective
    }
  };

  /**
   * @desc FormRequiredDirective attribute for injecting RequiredValidator.
   * @example
   * <input type="text" formControlName="firstName" required />
   */

  var FormRequiredDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormRequiredDirective, _Directive);

    function FormRequiredDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormRequiredDirective.prototype;

    _proto.onInit = function onInit() {
      // console.log('FormRequiredDirective', this.host.control);
      var validator = this.validator = RequiredValidator();
      this.host.control.addValidators(validator);
    };

    return FormRequiredDirective;
  }(rxcomp.Directive);
  FormRequiredDirective.meta = {
    selector: '[required][formControl],[required][formControlName]',
    inputs: ['required'],
    hosts: {
      host: FormAbstractDirective
    }
  };

  /**
   * @desc FormModule Class.
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

  var FormModule =
  /*#__PURE__*/
  function (_Module) {
    _inheritsLoose(FormModule, _Module);

    function FormModule() {
      return _Module.apply(this, arguments) || this;
    }

    return FormModule;
  }(rxcomp.Module);
  var factories = [FormArrayDirective, FormCheckboxDirective, FormFieldComponent, FormGroupDirective, FormInputDirective, FormPlaceholderDirective, FormRadioDirective, FormSelectDirective, FormSubmitDirective, FormEmailDirective, FormMaxDirective, FormMaxLengthDirective, FormMinDirective, FormMinLengthDirective, FormPatternDirective, FormRequiredDirective, FormRequiredTrueDirective];
  var pipes = [];
  FormModule.meta = {
    declarations: [].concat(factories, pipes),
    exports: [].concat(factories, pipes)
  };

  /**
   * @desc Abstract class representing a form control.
   * @abstract
   * @access public
   */

  var FormAbstract =
  /*#__PURE__*/
  function () {
    /**
     * Create a FormAbstract.
     * @param {FormValidator|FormValidator[]} validators - A list of validators.
     */
    function FormAbstract(validators) {
      this.validators = validators ? Array.isArray(validators) ? validators : [validators] : [];
    }
    /**
     * @private initialize subjects
     * @return {void}
     */


    var _proto = FormAbstract.prototype;

    _proto.initSubjects_ = function initSubjects_() {
      /**
       * @private
       */
      this.valueSubject = new rxjs.BehaviorSubject(null);
      /**
       * @private
       */

      this.statusSubject = new rxjs.BehaviorSubject(this);
      /**
       * @private
       */

      this.validatorsSubject = new rxjs.BehaviorSubject().pipe(operators.switchAll());
      this.switchValidators_();
    }
    /**
     * @private
     */
    ;

    _proto.switchValidators_ = function switchValidators_() {
      var validators = this.validators.map(function (x) {
        return x.params$;
      });
      var validators$ = validators.length ? rxjs.combineLatest(validators) : rxjs.of(validators);
      this.validatorsSubject.next(validators$);
    }
    /**
     * @private initialize observables
     * @return {void}
     */
    ;

    _proto.initObservables_ = function initObservables_() {
      var _this = this;

      this.value$ = this.valueSubject.pipe(operators.distinctUntilChanged(), operators.skip(1), operators.tap(function () {
        /**
         * @private
         */
        _this.submitted_ = false;
        /**
         * @private
         */

        _this.dirty_ = true;

        _this.statusSubject.next(_this);
      }), operators.shareReplay(1));
      this.status$ = rxjs.merge(this.statusSubject, this.validatorsSubject).pipe( // auditTime(1),
      operators.switchMap(function () {
        return _this.validate$(_this.value);
      }), operators.shareReplay(1));
      this.changes$ = rxjs.merge(this.value$, this.status$).pipe(operators.map(function () {
        return _this.value;
      }), operators.auditTime(1), operators.shareReplay(1));
    }
    /**
     * @param {null | string} value - the inner control value
     * @return {Observable<errors>} an object with key, value errors
     */
    ;

    _proto.validate$ = function validate$(value) {
      var _this2 = this;

      if (this.status === FormStatus.Disabled || this.status === FormStatus.Hidden || this.submitted_ || !this.validators.length) {
        this.errors = {};

        if (this.status === FormStatus.Invalid) {
          this.status = FormStatus.Valid;
        }

        return rxjs.of(this.errors);
      } else {
        return rxjs.combineLatest(this.validators.map(function (x) {
          var result$ = x.validate(value);
          return rxjs.isObservable(result$) ? result$ : rxjs.of(result$);
        })).pipe(operators.map(function (results) {
          _this2.errors = Object.assign.apply(Object, [{}].concat(results));
          _this2.status = Object.keys(_this2.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
        }));
      }
    }
    /**
     * @return {boolean} the pending status
     */
    ;

    /**
     * @return {void}
     */
    _proto.reset = function reset() {
      this.status = FormStatus.Pending;
      this.value_ = null;
      this.dirty_ = false;
      this.touched_ = false;
      this.submitted_ = false;
      this.statusSubject.next(this);
    }
    /**
     * @param {null | string} value - a value
     * @return {void}
     */
    ;

    _proto.patch = function patch(value) {
      this.value_ = value;
      this.dirty_ = true;
      this.submitted_ = false;
      this.statusSubject.next(this);
    }
    /**
     * adds one or more FormValidator.
     * @param {...FormValidator[]} validators - A list of validators.
     */
    ;

    _proto.addValidators = function addValidators() {
      var _this$validators;

      (_this$validators = this.validators).push.apply(_this$validators, arguments);

      this.switchValidators_();
    }
    /**
     * replace one or more FormValidator.
     * @param {...FormValidator[]} validators - A list of validators.
     */
    ;

    _proto.replaceValidators = function replaceValidators() {
      for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
        validators[_key] = arguments[_key];
      }

      this.validators = validators;
      this.switchValidators_();
    }
    /**
     * remove all FormValidator.
     */
    ;

    _proto.clearValidators = function clearValidators() {
      this.validators = [];
      this.switchValidators_();
    };

    _createClass(FormAbstract, [{
      key: "pending",
      get: function get() {
        return this.status === FormStatus.Pending;
      }
      /**
       * @return {boolean} the valid status
       */

    }, {
      key: "valid",
      get: function get() {
        return this.status !== FormStatus.Invalid;
      }
      /**
       * @return {boolean} the invalid status
       */

    }, {
      key: "invalid",
      get: function get() {
        return this.status === FormStatus.Invalid;
      }
      /**
       * @return {boolean} the disabled status
       */

    }, {
      key: "disabled",
      get: function get() {
        return this.status === FormStatus.Disabled;
      }
      /**
       * @return {boolean} the enabled status
       */
      ,

      /**
       * @param {boolean} disabled - the disabled state
       * @return {void}
       */
      set: function set(disabled) {
        if (disabled) {
          if (this.status !== FormStatus.Disabled) {
            this.status = FormStatus.Disabled;
            this.statusSubject.next(this);
          }
        } else {
          if (this.status === FormStatus.Disabled) {
            this.reset();
          }
        }
      }
      /**
       * @param {boolean} hidden - the hidden state
       * @return {void}
       */

    }, {
      key: "enabled",
      get: function get() {
        return this.status !== FormStatus.Disabled;
      }
      /**
       * @return {boolean} the hidden status
       */

    }, {
      key: "hidden",
      get: function get() {
        return this.status === FormStatus.Hidden;
      }
      /**
       * @return {boolean} the visible status
       */
      ,
      set: function set(hidden) {
        if (hidden) {
          if (this.status !== FormStatus.Hidden) {
            this.status = FormStatus.Hidden;
            console.log('set hidden', hidden, this.status);
            this.statusSubject.next(this);
          }
        } else {
          if (this.status === FormStatus.Hidden) {
            this.reset();
          }
        }
      }
      /**
       * @param {boolean} submitted - the submitted state
       * @return {void}
       */

    }, {
      key: "visible",
      get: function get() {
        return this.status !== FormStatus.Hidden;
      }
      /**
       * @return {boolean} the submitted status
       */

    }, {
      key: "submitted",
      get: function get() {
        return this.submitted_;
      }
      /**
       * @return {boolean} the dirty status
       */
      ,
      set: function set(submitted) {
        this.submitted_ = submitted;
        this.statusSubject.next(this);
      }
      /**
       * @param {boolean} touched - the touched state
       * @return {void}
       */

    }, {
      key: "dirty",
      get: function get() {
        return this.dirty_;
      }
      /**
       * @return {boolean} the pristine status
       */

    }, {
      key: "pristine",
      get: function get() {
        return !this.dirty_;
      }
      /**
       * @return {boolean} the touched status
       */

    }, {
      key: "touched",
      get: function get() {
        return this.touched_;
      }
      /**
       * @return {boolean} the untouched status
       */
      ,
      set: function set(touched) {
        /**
         * @private
         */
        this.touched_ = touched;
        this.statusSubject.next(this);
      }
      /**
       * @return {null | string} inner value of the control
       */

    }, {
      key: "untouched",
      get: function get() {
        return !this.touched_;
      }
    }, {
      key: "value",
      get: function get() {
        return this.value_;
      }
      /**
       * @param {null | string} value - a value
       * @return {void}
       */
      ,
      set: function set(value) {
        // console.log('set value', value);

        /**
         * @private
         */
        this.value_ = value;
        this.valueSubject.next(value);
      }
    }]);

    return FormAbstract;
  }();

  /**
   * @desc Class representing a FormControl.
   */

  var FormControl =
  /*#__PURE__*/
  function (_FormAbstract) {
    _inheritsLoose(FormControl, _FormAbstract);

    /**
     * @desc Create a FormControl.
     * @example
     * const form = new FormControl(null);
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param {null | string | FormControl} value - The value of the control.
     * @param {FormValidator[]} validators - A list of validators.
     */
    function FormControl(value, validators) {
      var _this;

      if (value === void 0) {
        value = null;
      }

      _this = _FormAbstract.call(this, validators) || this;
      /**
       * @private
       */

      _this.value_ = value;
      /**
       * @private
       */

      _this.status = FormStatus.Pending;
      _this.errors = {};

      _this.initSubjects_();

      _this.initObservables_();

      _this.statusSubject.next(_assertThisInitialized(_this));

      return _this;
    }

    return FormControl;
  }(FormAbstract);

  /**
   * @desc Abstract class representing a form collection.
   * @abstract
   * @access public
   */

  var FormAbstractCollection =
  /*#__PURE__*/
  function (_FormAbstract) {
    _inheritsLoose(FormAbstractCollection, _FormAbstract);

    /**
     * Create a FormAbstract.
     * @param {Map<string, any|FormAbstract>} controls - An object containing controls.
     * @param {FormValidator[]} validators - A list of validators.
     */
    function FormAbstractCollection(controls, validators) {
      var _this;

      _this = _FormAbstract.call(this, validators) || this;
      _this.controls = controls;

      _this.initControls_(controls);

      _this.initSubjects_();

      _this.initObservables_();

      return _this;
    }
    /**
     * @private
     */


    var _proto = FormAbstractCollection.prototype;

    _proto.initControl_ = function initControl_(control, key) {
      var _control;

      control = control instanceof FormAbstract ? control : new FormControl(control);

      (_control = control).addValidators.apply(_control, this.validators);

      control.name = key;
      return control;
    }
    /**
     * @private
     */
    ;

    _proto.initControls_ = function initControls_(controls) {
      var _this2 = this;

      this.forEach_(function (control, key) {
        _this2.init(control, key);
      });
      return controls;
    }
    /**
     * @private
     */
    ;

    _proto.initSubjects_ = function initSubjects_() {
      this.changesChildren = new rxjs.BehaviorSubject().pipe(operators.switchAll());
      this.switchSubjects_();
    }
    /**
     * @private
     */
    ;

    _proto.switchSubjects_ = function switchSubjects_() {
      var changesChildren = this.reduce_(function (result, control) {
        result.push(control.changes$);
        return result;
      }, []);
      var changesChildren$ = changesChildren.length ? rxjs.combineLatest(changesChildren) : rxjs.of(changesChildren);
      this.changesChildren.next(changesChildren$);
    }
    /**
     * @private
     */
    ;

    _proto.initObservables_ = function initObservables_() {
      var _this3 = this;

      this.changes$ = this.changesChildren.pipe(operators.map(function () {
        return _this3.value;
      }), operators.shareReplay(1));
    };

    _proto.validate = function validate(value) {
      if (this.status === FormStatus.Disabled || this.status === FormStatus.Hidden) {
        // this.errors = {};
        this.errors = [];
      } else {
        // this.errors = Object.assign({}, ...this.validators.map(x => x(value)));
        // this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
        var errors = this.validators.map(function (x) {
          return x(value);
        }).filter(function (x) {
          return x !== null;
        });
        this.errors = this.reduce_(function (result, control) {
          return result.concat(control.errors);
        }, errors);
        this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
      }

      return this.errors;
    }
    /**
     * @private
     */
    ;

    _proto.forEach_ = function forEach_(callback) {
      var _this4 = this;

      Object.keys(this.controls).forEach(function (key) {
        return callback(_this4.controls[key], key);
      });
    }
    /**
     * @private
     */
    ;

    _proto.reduce_ = function reduce_(callback, result) {
      this.forEach_(function (control, key) {
        result = callback(result, control, key);
      });
      return result;
    }
    /**
     * @private
     */
    ;

    _proto.all_ = function all_(key, value) {
      return this.reduce_(function (result, control) {
        return result && control[key] === value;
      }, true);
    }
    /**
     * @private
     */
    ;

    _proto.any_ = function any_(key, value) {
      return this.reduce_(function (result, control) {
        return result || control[key] === value;
      }, false);
    };

    _proto.reset = function reset() {
      this.forEach_(function (control) {
        return control.reset();
      });
    };

    _proto.patch = function patch(value) {
      if (value) {
        this.forEach_(function (control, key) {
          control.patch(value[key]);
        });
      }
    };

    _proto.init = function init(control, key) {
      this.controls[key] = this.initControl_(control, key);
    };

    _proto.get = function get(key) {
      return this.controls[key];
    };

    _proto.set = function set(control, key) {
      delete this.controls[key];
      this.controls[key] = this.initControl_(control, key);
      this.switchSubjects_();
    } // !!! needed?
    ;

    _proto.add = function add(control, key) {
      this.controls[key] = this.initControl_(control, key);
      this.switchSubjects_();
    };

    _proto.remove = function remove(control) {
      var _this5 = this;

      var key = Object.keys(this.controls).find(function (key) {
        return _this5.controls[key] === control ? key : null;
      });

      if (key) {
        this.removeKey(key);
      }
    };

    _proto.removeKey = function removeKey(key) {
      var changed = this.controls[key] !== undefined;
      delete this.controls[key];

      if (changed) {
        this.switchSubjects_();
      }
    }
    /**
     * adds one or more FormValidator.
     * @param {...FormValidator[]} validators - A list of validators.
     */
    ;

    _proto.addValidators = function addValidators() {
      for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
        validators[_key] = arguments[_key];
      }

      this.forEach_(function (control) {
        return control.addValidators.apply(control, validators);
      });
    }
    /**
     * replace one or more FormValidator.
     * @param {...FormValidator[]} validators - A list of validators.
     */
    ;

    _proto.replaceValidators = function replaceValidators() {
      for (var _len2 = arguments.length, validators = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        validators[_key2] = arguments[_key2];
      }

      this.forEach_(function (control) {
        return control.replaceValidators.apply(control, validators);
      });
    }
    /**
     * remove all FormValidator.
     */
    ;

    _proto.clearValidators = function clearValidators() {
      this.forEach_(function (control) {
        return control.clearValidators();
      });
    };

    _createClass(FormAbstractCollection, [{
      key: "valid",
      get: function get() {
        return this.all_('valid', true);
      }
    }, {
      key: "invalid",
      get: function get() {
        return this.any_('invalid', true);
      }
    }, {
      key: "pending",
      get: function get() {
        return this.any_('pending', true);
      }
    }, {
      key: "disabled",
      get: function get() {
        return this.all_('disabled', true);
      },
      set: function set(disabled) {
        this.forEach_(function (control) {
          control.disabled = disabled;
        });
      }
    }, {
      key: "enabled",
      get: function get() {
        return this.any_('enabled', true);
      }
    }, {
      key: "hidden",
      get: function get() {
        return this.all_('hidden', true);
      },
      set: function set(hidden) {
        this.forEach_(function (control) {
          control.hidden = hidden;
        });
      }
    }, {
      key: "visible",
      get: function get() {
        return this.any_('visible', true);
      }
    }, {
      key: "submitted",
      get: function get() {
        return this.all_('submitted', true);
      },
      set: function set(submitted) {
        this.forEach_(function (control) {
          control.submitted = submitted;
        });
      }
    }, {
      key: "dirty",
      get: function get() {
        return this.any_('dirty', true);
      }
    }, {
      key: "pristine",
      get: function get() {
        return this.all_('pristine', true);
      }
    }, {
      key: "touched",
      get: function get() {
        return this.all_('touched', true);
      },
      set: function set(touched) {
        this.forEach_(function (control) {
          control.touched = touched;
        });
      }
    }, {
      key: "untouched",
      get: function get() {
        return this.any_('untouched', true);
      }
    }, {
      key: "value",
      get: function get() {
        return this.reduce_(function (result, control, key) {
          result[key] = control.value;
          return result;
        }, {});
      },
      set: function set(value) {
        this.forEach_(function (control, key) {
          control.value = value[key];
        });
      }
    }, {
      key: "errors",
      get: function get() {
        return this.reduce_(function (result, control) {
          return Object.assign(result, control.errors);
        }, {});
      }
    }]);

    return FormAbstractCollection;
  }(FormAbstract);

  /**
   * @desc Class representing a FormArray.
   */

  var FormArray =
  /*#__PURE__*/
  function (_FormAbstractCollecti) {
    _inheritsLoose(FormArray, _FormAbstractCollecti);

    /**
     * @desc Create a FormArray.
     * @example
     * const form = new FormArray([null, null, null]);
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param {any|FormControl[]} controls - An array containing controls.
     * @param {FormValidator[]} validators - A list of validators.
     */
    function FormArray(controls, validators) {
      if (controls === void 0) {
        controls = [];
      }

      return _FormAbstractCollecti.call(this, controls, validators) || this;
    }
    /**
     * @private
     */


    var _proto = FormArray.prototype;

    _proto.forEach_ = function forEach_(callback) {
      this.controls.forEach(function (control, key) {
        return callback(control, key);
      });
    }
    /**
     * @return {any[]}
     */
    ;

    /**
     * @protected
     * @param {FormAbstract} control
     * @param {number} key
     */
    _proto.init = function init(control, key) {
      this.controls.length = Math.max(this.controls.length, key);
      this.controls[key] = this.initControl_(control, key);
    }
    /**
     * @param {FormAbstract} control
     * @param {number} key
     */
    ;

    _proto.set = function set(control, key) {
      // this.controls.length = Math.max(this.controls.length, key);
      // this.controls[key] = this.initControl_(control);
      this.controls.splice(key, 1, this.initControl_(control, key));
      this.switchSubjects_();
    } // !!! needed?

    /**
     * @param {FormAbstract} control
     * @param {number} key
     */
    ;

    _proto.add = function add(control, key) {
      this.controls.length = Math.max(this.controls.length, key);
      this.controls[key] = this.initControl_(control, key);
      this.switchSubjects_();
    }
    /**
     * @param {FormAbstract} control
     */
    ;

    _proto.push = function push(control) {
      // this.controls.length = Math.max(this.controls.length, key);
      // this.controls[key] = this.initControl_(control);
      this.controls.push(this.initControl_(control, this.controls.length));
      this.switchSubjects_();
    }
    /**
     * @param {FormAbstract} control
     * @param {number} key
     */
    ;

    _proto.insert = function insert(control, key) {
      this.controls.splice(key, 0, this.initControl_(control, key));
      this.switchSubjects_();
    }
    /**
     * @param {FormAbstract} control
     */
    ;

    _proto.remove = function remove(control) {
      var key = this.controls.indexOf(control);

      if (key !== -1) {
        this.removeKey(key);
      }
    }
    /**
     * @param {number} key
     */
    ;

    _proto.removeKey = function removeKey(key) {
      if (this.controls.length > key) {
        this.controls.splice(key, 1);
        this.switchSubjects_();
      }
    }
    /**
     * @param {number} key
     */
    ;

    _proto.at = function at(key) {
      return this.controls[key];
    };

    _createClass(FormArray, [{
      key: "value",
      get: function get() {
        return this.reduce_(function (result, control, key) {
          result[key] = control.value;
          return result;
        }, []); // init as array
      }
      /**
       * @return {number}
       */

    }, {
      key: "length",
      get: function get() {
        return this.controls.length;
      }
    }]);

    return FormArray;
  }(FormAbstractCollection);

  /**
   * @desc Class representing a FormGroup.
   */

  var FormGroup =
  /*#__PURE__*/
  function (_FormAbstractCollecti) {
    _inheritsLoose(FormGroup, _FormAbstractCollecti);

    /**
     * @desc Create a FormControl.
     * @example
     * const form = new FormGroup({
     * 	firstName: null,
     *  lastName: null,
     * });
     *
     * form.changes$.subscribe(changes => {
     * 	console.log(changes);
     * });
     * @param {Map<string, any|FormAbstract>} controls - An object containing controls.
     * @param {FormValidator[]} validators - A list of validators.
     */
    function FormGroup(controls, validators) {
      if (controls === void 0) {
        controls = {};
      }

      return _FormAbstractCollecti.call(this, controls, validators) || this;
    }

    return FormGroup;
  }(FormAbstractCollection);

  var AppComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(AppComponent, _Component);

    function AppComponent() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = AppComponent.prototype;

    _proto.onInit = function onInit() {
      var _this = this;

      var form = new FormGroup({
        firstName: null,
        lastName: null,
        email: null,
        country: null,
        evaluate: null,
        newsletter: null,
        privacy: null,
        items: new FormArray([null, null, null], RequiredValidator())
      });
      form.changes$.subscribe(function (changes) {
        console.log('AppComponent.form.changes$', changes, form.valid, form);

        _this.pushChanges();
      });
      this.form = form;
    };

    _proto.test = function test() {
      this.form.patch({
        firstName: 'Jhon',
        lastName: 'Appleseed',
        email: 'jhonappleseed@gmail.com',
        country: 'en-US',
        evaluate: 'free',
        privacy: true,
        items: ['rxcomp', 'rxjs', 'forms']
      });
    };

    _proto.onSubmit = function onSubmit() {
      if (this.form.valid) {
        console.log('AppComponent.onSubmit', this.form.value);
        this.form.submitted = true; // this.form.reset();
      }
    };

    return AppComponent;
  }(rxcomp.Component);
  AppComponent.meta = {
    selector: '[app-component]'
  };

  var ErrorsComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ErrorsComponent, _Component);

    function ErrorsComponent() {
      return _Component.apply(this, arguments) || this;
    }

    return ErrorsComponent;
  }(rxcomp.Component);
  ErrorsComponent.meta = {
    selector: 'errors-component',
    inputs: ['control'],
    template:
    /* html */
    "\n\t<div class=\"inner\" [style]=\"{ display: control.invalid ? 'block' : 'none' }\">\n\t\t<div class=\"error\" *for=\"let [key, value] of control.errors\">\n\t\t\t<span class=\"key\" [innerHTML]=\"key\"></span> <span class=\"value\" [innerHTML]=\"value | json\"></span>\n\t\t</div>\n\t</div>\n\t"
  };

  var AppModule =
  /*#__PURE__*/
  function (_Module) {
    _inheritsLoose(AppModule, _Module);

    function AppModule() {
      return _Module.apply(this, arguments) || this;
    }

    return AppModule;
  }(rxcomp.Module);
  AppModule.meta = {
    imports: [rxcomp.CoreModule, FormModule],
    declarations: [ErrorsComponent],
    bootstrap: AppComponent
  };

  rxcomp.Browser.bootstrap(AppModule);

})));
